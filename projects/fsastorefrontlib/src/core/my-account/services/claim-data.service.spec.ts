import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import * as fromReducers from '../store/reducers';
import { UserToken, AuthService } from '@spartacus/core';
import { Claim } from '../../../occ/occ-models';
import { ClaimDataService } from './claim-data.service';
import * as fromAction from '../store/actions';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { StateWithMyAccount } from '../store/my-account-state';

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
const testClaim: Claim = {
  claimNumber: 'CL00001',
};

describe('ClaimDataService', () => {
  let service: ClaimDataService;
  let store: Store<StateWithMyAccount>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromReducers.getReducers()),
      ],
      providers: [
        ClaimDataService,
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ],
    });
    service = TestBed.inject(ClaimDataService as Type<ClaimDataService>);
    store = TestBed.inject(Store as Type<Store<StateWithMyAccount>>);
  });

  describe('userId', () => {
    it('should return userId when user logged in', () => {
      userToken$.next(testUserToken);
      expect(service.userId).toEqual(testUserToken.userId);
    });

    it('should return anonymous if user is not logged in', () => {
      userToken$.next({});
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });
  });

  describe('claim', () => {
    it('should return claimData', () => {
      store.dispatch(
        new fromAction.CreateClaimSuccess({
          claimNumber: testClaim.claimNumber,
        })
      );
      expect(service.claimData).toEqual(testClaim);
    });
  });
});
