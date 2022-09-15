import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Claim } from '../../../occ/occ-models';
import * as fromAction from '../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import * as fromReducers from '../store/reducers';
import { ClaimDataService } from './claim-data.service';

const userId: Observable<string> = new BehaviorSubject<string>(
  OCC_USER_ID_ANONYMOUS
);
class MockUserIdService {
  getUserId(): Observable<string> {
    return userId;
  }
}

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
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });
    service = TestBed.inject(ClaimDataService);
    store = TestBed.inject(Store);
  });

  describe('userId', () => {
    it('should return userId when user logged in', () => {
      (userId as BehaviorSubject<string>).next(OCC_USER_ID_CURRENT);
      expect(service.userId).toEqual(OCC_USER_ID_CURRENT);
    });
    it('should return userId when user not logged in', () => {
      (userId as BehaviorSubject<string>).next(OCC_USER_ID_ANONYMOUS);
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });
    it('should return anonymous userId when userId is empty', () => {
      (userId as BehaviorSubject<string>).next('');
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
    it('should set and get claims', () => {
      service.claims = [{}];
      expect(service.claims.length).toEqual(1);
    });
  });
});
