import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import * as fromReducers from '../store/reducers/index';
import { UserToken, AuthService } from '@spartacus/core';
import * as fromReducer from '../store/reducers';
import { QuoteDataService } from './quote-data.service';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';

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

describe('ClaimDataService', () => {
  let service: QuoteDataService;
  let store: Store<fromReducer.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromReducers.getReducers()),
      ],
      providers: [
        QuoteDataService,
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ],
    });
    service = TestBed.get(QuoteDataService as Type<QuoteDataService>);
    store = TestBed.get(Store as Type<Store<fromReducers.UserState>>);
  });

  describe('userId', () => {
    it('should return userId when user logged in', () => {
      userToken$.next(testUserToken);
      expect(service.userId).toEqual(testUserToken.userId);
    });
    it('should return anonymous when user is not logged in', () => {
      userToken$.next({});
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });
  });
});
