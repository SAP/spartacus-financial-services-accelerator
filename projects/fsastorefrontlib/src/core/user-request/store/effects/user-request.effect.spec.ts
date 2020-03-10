import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromReducer from './../../store/reducers/index';
import * as fromEffects from './user-request.effect';
import { UserRequestConnector } from '../../connectors/user-request.connector';

const userRequest = {
  requestStatus: 'OPEN',
  requestId: 'testRequest001',
  userId: OCC_USER_ID_CURRENT,
  configurationSteps: [
    {
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
      yformConfigurator: {
        content: {},
      },
    },
  ],
};
const userRequestCompleted = {
  userId: OCC_USER_ID_CURRENT,
  requestStatus: 'COMPLETED',
  requestId: 'testRequest001',
  configurationSteps: [
    {
      status: 'COMPLETED',
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
      yformConfigurator: {
        content: {},
      },
    },
  ],
};
class MockOccUserRequestAdapter {
  getUserRequest() {
    return of(userRequest);
  }

  submitUserRequest() {
    return of(userRequest);
  }

  updateUserRequest() {
    return of(userRequest);
  }
}

class MockActions {}

describe('User Request Effects', () => {
  let actions$: Observable<fromActions.UserRequestActions>;
  let effects: fromEffects.UserRequestEffects;
  let mockOccUserRequestAdapter: MockOccUserRequestAdapter;

  beforeEach(() => {
    mockOccUserRequestAdapter = new MockOccUserRequestAdapter();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('userRequest', fromReducer.getReducers()),
      ],
      providers: [
        { provide: UserRequestConnector, useValue: mockOccUserRequestAdapter },
        {
          provide: Actions,
          useClass: MockActions,
        },
        fromEffects.UserRequestEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.UserRequestEffects as Type<
      fromEffects.UserRequestEffects
    >);
  });

  describe('submitUserRequest$', () => {
    it('should submit user request', () => {
      const action = new fromActions.SubmitUserRequest({
        userRequest,
      });
      const loadUserRequest = new fromActions.LoadUserRequest(userRequest);
      const submitUserRequestSuccess = new fromActions.SubmitUserRequestSuccess(
        userRequest
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUserRequest,
        c: submitUserRequestSuccess,
      });
      expect(effects.submitUserRequest$).toBeObservable(expected);
    });

    it('should fail to submit user request', () => {
      spyOn(mockOccUserRequestAdapter, 'submitUserRequest').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.SubmitUserRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
      });
      const completion = new fromActions.SubmitUserRequestFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.submitUserRequest$).toBeObservable(expected);
    });
  });
  describe('updateUserRequest$', () => {
    it('should update user request', () => {
      const action = new fromActions.UpdateUserRequest({
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
      const updateSuccess = new fromActions.UpdateUserRequestSuccess(
        userRequest
      );
      const updateClaim = new fromActions.UpdateClaim({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
        claimData: {},
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: updateSuccess,
        c: updateClaim,
      });
      expect(effects.updateUserRequest$).toBeObservable(expected);
    });

    it('should fail to update user request', () => {
      spyOn(mockOccUserRequestAdapter, 'updateUserRequest').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.UpdateUserRequest({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.UpdateUserRequestFail('Error');
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateUserRequest$).toBeObservable(expected);
    });

    it('should update user request - last step - submit', () => {
      spyOn(mockOccUserRequestAdapter, 'updateUserRequest').and.returnValue(
        of(userRequestCompleted)
      );
      const action = new fromActions.UpdateUserRequest(userRequestCompleted);
      const completion = new fromActions.SubmitUserRequest({
        userId: OCC_USER_ID_CURRENT,
        requestId: 'testRequest001',
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.updateUserRequest$).toBeObservable(expected);
    });
  });
});
