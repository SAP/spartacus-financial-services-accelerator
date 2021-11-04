import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ClaimDataService } from '../services/claim-data.service';
import * as fromAction from '../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { reducerProvider, reducerToken } from '../store/reducers';
import { ClaimService } from './claim.service';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const claimId = 'CL00001';
const claimMock = {
  claimNumber: claimId,
};
const claimPolicies = {
  insurancePolicies: [
    {
      policyId: policyId,
      contractId: contractId,
    },
  ],
  loaded: false,
};

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
class MockAuthService {
  isUserLoggedIn() {
    return of(true);
  }
}
describe('ClaimServiceTest', () => {
  let service: ClaimService;
  let store: Store<StateWithMyAccount>;
  let claimData: ClaimDataServiceStub;
  let authService: MockAuthService;
  let userIdService: MockUserIdService;

  class ClaimDataServiceStub {
    userId = userId;
    claimData;
  }

  beforeEach(() => {
    authService = new MockAuthService();
    userIdService = new MockUserIdService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        ClaimService,
        reducerProvider,
        { provide: ClaimDataService, useClass: ClaimDataServiceStub },
        { provide: AuthService, useValue: authService },
        { provide: UserIdService, useValue: userIdService },
      ],
    });

    service = TestBed.inject(ClaimService);
    claimData = TestBed.inject(ClaimDataService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if ClaimService is injected', inject(
    [ClaimService],
    (claimService: ClaimService) => {
      expect(claimService).toBeTruthy();
    }
  ));

  it('should be able to get claims if data exists', () => {
    store.dispatch(new fromAction.LoadClaimsSuccess({ claimId: claimId }));
    let claimsResponse;
    service
      .getClaims()
      .subscribe(claims => {
        claimsResponse = claims;
      })
      .unsubscribe();
    expect(claimsResponse).toEqual({ claimId: claimId });
  });

  it('should be able to get current claim', () => {
    store.dispatch(new fromAction.LoadClaimByIdSuccess({ claimId: claimId }));
    let claimResponse;
    service
      .getCurrentClaim()
      .subscribe(claim => {
        claimResponse = claim;
      })
      .unsubscribe();
    expect(claimResponse).toEqual({ claimId: claimId });
  });

  it('should be able to load claim by id', () => {
    service.currentClaimId = claimId;
    service.loadClaimById(service.currentClaimId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadClaimById({ userId: userId, claimId: claimId })
    );
  });

  it('should be able to get loaded claims flag', () => {
    store.dispatch(new fromAction.LoadClaimsSuccess({ claimId: claimId }));
    let claimsLoaded;
    service
      .getLoaded()
      .subscribe(loaded => {
        claimsLoaded = loaded;
      })
      .unsubscribe();
    expect(claimsLoaded).toEqual(true);
  });

  it('should be able to get policies for new claim ', () => {
    store.dispatch(new fromAction.LoadClaimPoliciesSuccess(claimPolicies));
    let policiesResponse;
    service
      .getClaimPolicies()
      .subscribe(state => {
        policiesResponse = state.claimPoliciesData;
      })
      .unsubscribe();
    expect(policiesResponse).toEqual(claimPolicies);
  });

  it('should be able to get policies for new claim loaded flag', () => {
    store.dispatch(new fromAction.LoadClaimPoliciesSuccess(claimPolicies));
    let policiesLoaded;
    service
      .getClaimPolicies()
      .subscribe(state => {
        policiesLoaded = state.loaded;
      })
      .unsubscribe();
    expect(policiesLoaded).toEqual(true);
  });

  it('should be able to get refresh flag to reload claims', () => {
    store.dispatch(new fromAction.LoadClaimsSuccess({ claimId: claimId }));
    let shouldReload;
    service
      .shouldReload()
      .subscribe(reaload => {
        shouldReload = reaload;
      })
      .unsubscribe();
    expect(shouldReload).toEqual(false);
  });

  it('should be able to load claims', () => {
    service.loadClaims();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadClaims({ userId: userId })
    );
  });

  it('should be able to create claim', () => {
    service.createClaim(policyId, contractId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CreateClaim({
        userId: userId,
        policyId: policyId,
        contractId: contractId,
      })
    );
  });

  it('should be able to delete claim', () => {
    service.removeClaim(userId, claimId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.DeleteClaim({ userId: userId, claimId: claimId })
    );
  });

  it('should be able to resume claim', () => {
    service.resumeClaim(claimId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadClaimById({ userId: userId, claimId: claimId })
    );
  });

  it('should be able to set selected policy', () => {
    service.setSelectedPolicy(userId, policyId, contractId);
    let selectedPolicy;
    service
      .getSelectedPolicy()
      .subscribe(policy => {
        selectedPolicy = policy;
      })
      .unsubscribe();
    expect(selectedPolicy).toEqual({
      userId: userId,
      policyId: policyId,
      contractId: contractId,
    });
  });

  it('should be able to reset selected policy', () => {
    service.resetSelectedPolicy();
    let selectedPolicy;
    service
      .getSelectedPolicy()
      .subscribe(policy => {
        selectedPolicy = policy;
      })
      .unsubscribe();
    expect(selectedPolicy).toEqual(null);
  });

  it('should change claim test', () => {
    service.changeClaim(claimMock, OCC_USER_ID_CURRENT);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.ChangeClaim({
        userId: OCC_USER_ID_CURRENT,
        claimData: claimMock,
      })
    );
  });
});
