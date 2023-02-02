import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessage,
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { UserRequestConnector } from '../../../user-request/connectors';
import { ChangeRequestConnector } from '../../connectors';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './change-request.effect';

const requestID = 'REQ0001';
const policyId = 'policyId';
const contractId = 'contractId';
const changeRequestType = 'requestType';
const changeRequest = {
  requestId: requestID,
};
const changeRequestCompleted = {
  requestStatus: 'COMPLETED',
  requestId: 'testRequest001',
  userId: OCC_USER_ID_CURRENT,
  configurationSteps: [
    {
      status: 'COMPLETED',
      sequenceNumber: '1',
    },
  ],
  stepData: {
    sequenceNumber: 1,
  },
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
  cancelChangeRequest() {
    return of(changeRequest);
  }
}

class MockUserRequestConnector {
  submitUserRequest() {
    return of(changeRequest);
  }
  updateUserRequest() {
    return of(changeRequest);
  }
}
class GlobalMessageServiceMock {
  remove(): void {}
  add(_message: GlobalMessage): void {}
}

describe('Change Request Effects', () => {
  let actions$: Observable<fromActions.ChangeRequestAction>;
  let effects: fromEffects.ChangeRequestEffects;
  let mockChangeRequestConnector: MockChangeRequestConnector;
  let mockUserRequestConnector: MockUserRequestConnector;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    mockChangeRequestConnector = new MockChangeRequestConnector();
    mockUserRequestConnector = new MockUserRequestConnector();
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
        {
          provide: UserRequestConnector,
          useValue: mockUserRequestConnector,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
        },
        fromEffects.ChangeRequestEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ChangeRequestEffects);
    globalMessageService = TestBed.inject(GlobalMessageService);
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

      const completion = new fromActions.SimulateChangeRequestSuccess(
        changeRequest
      );
      const updateUserRequest = new fromActions.UpdateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
        stepData: undefined,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion,
        c: updateUserRequest,
      });
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

  describe('cancelChangeRequest$', () => {
    it('should cancel change request', () => {
      const action = new fromActions.CancelChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
      });
      const completion = new fromActions.CancelChangeRequestSuccess(
        changeRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.cancelChangeRequest$).toBeObservable(expected);
    });

    it('should fail to cancel change request', () => {
      spyOn(mockChangeRequestConnector, 'cancelChangeRequest').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.CancelChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: requestID,
      });
      const completion = new fromActions.CancelChangeRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.cancelChangeRequest$).toBeObservable(expected);
    });
  });

  describe('submitChangeRequest$', () => {
    it('should submit user request', () => {
      const action = new fromActions.SubmitChangeRequest({
        changeRequest,
      });
      const loadUserRequest = new fromActions.LoadChangeRequest(changeRequest);
      const submitUserRequestSuccess =
        new fromActions.SubmitChangeRequestSuccess(changeRequest);
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUserRequest,
        c: submitUserRequestSuccess,
      });
      expect(effects.submitChangeRequest$).toBeObservable(expected);
    });

    it('should fail to submit change request', () => {
      spyOn(mockUserRequestConnector, 'submitUserRequest').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.SubmitChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
      });
      const completion = new fromActions.SubmitChangeRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitChangeRequest$).toBeObservable(expected);
    });
  });
  describe('updateChanageRequest$', () => {
    it('should update change request', () => {
      const action = new fromActions.UpdateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
        stepData: {
          sequenceNumber: 1,
        },
        configurationSteps: [
          {
            status: 'OPEN',
          },
        ],
      });
      const updateSuccess = new fromActions.UpdateChangeRequestSuccess(
        changeRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: updateSuccess,
      });
      expect(effects.updateChangeRequest$).toBeObservable(expected);
    });

    it('should fail to update change request', () => {
      spyOn(mockUserRequestConnector, 'updateUserRequest').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.UpdateChangeRequest({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.UpdateChangeRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateChangeRequest$).toBeObservable(expected);
    });

    it('should update change request - last step - submit', () => {
      spyOn(mockUserRequestConnector, 'updateUserRequest').and.returnValue(
        of(changeRequestCompleted)
      );
      const action = new fromActions.UpdateChangeRequest(
        changeRequestCompleted
      );
      const completion = new fromActions.SubmitChangeRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateChangeRequest$).toBeObservable(expected);
    });
  });
});
