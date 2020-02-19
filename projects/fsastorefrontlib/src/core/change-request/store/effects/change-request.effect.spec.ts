import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './change-request.effect';
import * as fromUserReducers from './../../store/reducers/index';
import { ChangeRequestAdapter } from '../../connectors';

const changeRequest = {
  requestID: 'REQ0001',
};

const policyId = 'policyId';
const contractId = 'contractId';
const changeRequestType = 'requestType';

class MockOccChangeRequestAdapter {
  createChangeRequestForPolicy() {
    return of(changeRequest);
  }
}

describe('Change Request Effects', () => {
  let actions$: Observable<fromActions.ChangeRequestAction>;
  let effects: fromEffects.ChangeRequestEffects;
  let mockOccChangeRequestAdapter: MockOccChangeRequestAdapter;

  beforeEach(() => {
    mockOccChangeRequestAdapter = new MockOccChangeRequestAdapter();
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
          provide: ChangeRequestAdapter,
          useValue: mockOccChangeRequestAdapter,
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
  });

  it('should fail to create change request', () => {
    spyOn(
      mockOccChangeRequestAdapter,
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
