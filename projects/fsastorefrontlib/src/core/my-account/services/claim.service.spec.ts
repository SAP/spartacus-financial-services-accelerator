import { TestBed, inject } from '@angular/core/testing';
import { ClaimService } from './claim.service';
import * as fromReducer from '../store/reducers';
import { Store, StoreModule } from '@ngrx/store';
import { ClaimDataService } from './claim-data.service';
import { Type } from '@angular/core';
import * as fromAction from '../store/actions';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { of, Observable } from 'rxjs';
import { OCC_USER_ID_CURRENT, AuthService } from '@spartacus/core';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const claimId = 'CL00001';

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('ClaimServiceTest', () => {
  let service: ClaimService;
  let store: Store<fromReducer.UserState>;
  let claimData: ClaimDataServiceStub;
  let authService: MockAuthService;

  class ClaimDataServiceStub {
    userId = userId;
    claimData;
  }

  beforeEach(() => {
    authService = new MockAuthService();

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
      ],
    });

    service = TestBed.get(ClaimService as Type<ClaimService>);
    claimData = TestBed.get(ClaimDataService as Type<ClaimDataService>);
    store = TestBed.get(Store as Type<Store<fromReducer.UserState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ClaimService is injected', inject(
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

  it('should be able to load claims', () => {
    service.loadClaims();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadClaims({ userId: userId })
    );
  });

  it('should be able to submit claim', () => {
    service.submitClaim(userId, claimId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SubmitClaim({ userId: userId, claimId: claimId })
    );
  });

  it('should be able to create claim', () => {
    service.createClaim(policyId, contractId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CreateClaim({
        userId: OCC_USER_ID_CURRENT,
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
});
