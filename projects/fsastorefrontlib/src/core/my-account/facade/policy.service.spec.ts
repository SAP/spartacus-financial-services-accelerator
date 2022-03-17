import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PolicyConnector } from '../connectors/policy.connector';
import * as fromAction from '../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { PolicyService } from './policy.service';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const testCategory = 'testCategory';

const mockedPolicy = {
  policyId: policyId,
  contractId: contractId,
};

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockPolicyConnector {
  getPremiumCalendar() {
    return of(mockedPolicy);
  }
}

describe('PolicyServiceTest', () => {
  let service: PolicyService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;
  let policyConnector: PolicyConnector;

  beforeEach(() => {
    userIdService = new MockUserIdService();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        PolicyService,
        reducerProvider,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: PolicyConnector, useClass: MockPolicyConnector },
      ],
    });

    service = TestBed.inject(PolicyService);
    policyConnector = TestBed.inject(PolicyConnector);
    userIdService = TestBed.inject(UserIdService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(policyConnector, 'getPremiumCalendar').and.callThrough();
    spyOn(userIdService, 'getUserId').and.callThrough();
  });

  it('should PolicyService is injected', inject(
    [PolicyService],
    (policyService: PolicyService) => {
      expect(policyService).toBeTruthy();
    }
  ));

  it('should be able to get policies if data exists', () => {
    store.dispatch(new fromAction.LoadPoliciesSuccess(mockedPolicy));
    let policiesResponse;
    service
      .getPolicies()
      .subscribe(policies => {
        policiesResponse = policies;
      })
      .unsubscribe();
    expect(policiesResponse).toEqual(mockedPolicy);
  });

  it('should be able to check if policies are loaded', () => {
    store.dispatch(new fromAction.LoadPoliciesSuccess(mockedPolicy));
    let loaded;
    service
      .getLoaded()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual(true);
  });

  it('should be able to load policies', () => {
    service.loadPolicies();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadPolicies({ userId: userId })
    );
  });

  it('should be able to load policies for claims', () => {
    service.loadClaimPolicies(testCategory);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadClaimPolicies({
        userId: userId,
        policyCategoryCode: testCategory,
      })
    );
  });

  it('should be able to load policy details', () => {
    service.loadPolicyDetails(policyId, contractId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadPolicyDetails({
        userId: userId,
        policyId: policyId,
        contractId: contractId,
      })
    );
  });

  it('should be able to get premium calendar', () => {
    let loaded;
    service
      .getPremiumCalendar()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual(mockedPolicy);
  });
});
