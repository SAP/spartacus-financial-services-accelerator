import { UserToken, AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import * as fromReducers from '../store/reducers/index';
import * as fromReducer from '../store/reducers';
import { FSUserRequest } from './../../../occ/occ-models/occ.models';
import { USER_REQUEST_FEATURE } from './../store/user-request-state';
import { UserRequestDataService } from './user-request-data.service';
import * as fromActions from 'projects/fsastorefrontlib/src/core/user-request/store/actions';

const userToken$ = new ReplaySubject<UserToken | any>();

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

const testUserToken: UserToken = {
  access_token: 'access_token',
  userId: 'userId',
  refresh_token: 'refresh_token',
  token_type: 'token_type',
  expires_in: 1,
  scope: ['scope'],
};

const mockRequest: FSUserRequest = {
  requestId: 'test123',
  configurationSteps: [
    {
      name: 'step1',
      pageLabelOrId: 'page1',
      sequenceNumber: '1',
    },
    {
      name: 'step2',
      pageLabelOrId: 'page2',
      sequenceNumber: '2',
    },
  ],
};

describe('UserRequestDataService', () => {
  let service: UserRequestDataService;
  let store: Store<fromReducer.FSUserRequestState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_REQUEST_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        UserRequestDataService,
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ],
    });
    service = TestBed.get(UserRequestDataService as Type<UserRequestDataService>);
    store = TestBed.get(Store as Type<Store<fromReducer.FSUserRequestState>>);
  });

  describe('userId', () => {
    it('should return OCC_USER_ID_ANONYMOUS when user not logged in', () => {
      userToken$.next({});
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });

    it('should return userId when user logged in', () => {
      userToken$.next(testUserToken);
      expect(service.userId).toEqual(testUserToken.userId);
    });
  });

  it('should return user request', () => {
    userToken$.next(testUserToken);
    store.dispatch(new fromActions.LoadUserRequestSuccess(mockRequest));
    expect(service.userRequest).toEqual(mockRequest);
  });

  it('should return user request id', () => {
    userToken$.next(testUserToken);
    store.dispatch(new fromActions.LoadUserRequestSuccess(mockRequest));
    expect(service.requestId).toEqual(mockRequest.requestId);
  });

  it('should check if user request exist', () => {
    store.dispatch(new fromActions.LoadUserRequestSuccess(mockRequest));
    expect(service.hasUserRequest()).toEqual(true);
  });

  it('should not return request id', () => {
    store.dispatch(new fromActions.LoadUserRequestFail({}));
    expect(service.requestId).toEqual(undefined);
  });
});
