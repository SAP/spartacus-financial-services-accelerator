import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ChangeRequestConnector } from '../../connectors';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './change-request.effect';

const requestID = 'REQ0001';
const policyId = 'policyId';
const contractId = 'contractId';
const changeRequestType = 'requestType';
const changeRequest = {
  requestID: requestID,
};

class MockChangeRequestConnector {
  createChangeRequestForPolicy() {
    return of(changeRequest);
  }
  getChangeRequest() {
    return of(changeRequest);
  }

  simulateChangeRequest() {
    return of(changeRequest);
  }
}

describe('Change Request Effects', () => {
  let actions$: Observable<fromActions.ChangeRequestAction>;
  let effects: fromEffects.ChangeRequestEffects;
  let mockChangeRequestConnector: MockChangeRequestConnector;

  beforeEach(() => {
    mockChangeRequestConnector = new MockChangeRequestConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          'changeRequests',
          fromUserReducers.getReducers()
        ),
      ],
      providers: [
        {
          provide: ChangeRequestConnector,
          useValue: mockChangeRequestConnector,
        },
        fromEffects.ChangeRequestEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.ChangeRequestEffects as Type<
      fromEffects.ChangeRequestEffects
    >);
  });

  describe('createChangeRequest$', () => {
    it('should create change request', () => {
      const action = new fromActions.CreateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        policyId: policyId,
        contractId: contractId,
      });
      const completion = new fromActions.CreateChangeRequestSuccess(
        changeRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createChangeRequest$).toBeObservable(expected);
    });

    it('should fail to create change request', () => {
      spyOn(
        mockChangeRequestConnector,
        'createChangeRequestForPolicy'
      ).and.returnValue(throwError('Error'));
      const action = new fromActions.CreateChangeRequest({
        policyId: policyId,
        contractId: contractId,
        changeRequestType: changeRequestType,
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.CreateChangeRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.createChangeRequest$).toBeObservable(expected);
    });
  });

  describe('simulateChangeRequest$', () => {
    it('should simulate change request', () => {
      const action = new fromActions.SimulateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
        changeRequest: changeRequest,
      });
      const completion = new fromActions.SimulateChangeRequestSucess(
        changeRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.simulateChangeRequest$).toBeObservable(expected);
    });

    it('should fail to simulate change request', () => {
      spyOn(
        mockChangeRequestConnector,
        'simulateChangeRequest'
      ).and.returnValue(throwError('Error'));
      const action = new fromActions.SimulateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
        changeRequest: changeRequest,
      });
      const completion = new fromActions.SimulateChangeRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.simulateChangeRequest$).toBeObservable(expected);
    });
  });

  describe('loadChangeRequest$', () => {
    it('should load change request', () => {
      const action = new fromActions.LoadChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
      });
      const completion = new fromActions.LoadChangeRequestSuccess(
        changeRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadChangeRequest$).toBeObservable(expected);
    });
  });

  it('should fail to load change request', () => {
    spyOn(mockChangeRequestConnector, 'getChangeRequest').and.returnValue(
      throwError('Error')
    );
    const action = new fromActions.LoadChangeRequest({
      userId: OCC_USER_ID_CURRENT,
      requestId: requestID,
    });
    const completion = new fromActions.LoadChangeRequestFail(
      JSON.stringify('Error')
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadChangeRequest$).toBeObservable(expected);
  });
});
