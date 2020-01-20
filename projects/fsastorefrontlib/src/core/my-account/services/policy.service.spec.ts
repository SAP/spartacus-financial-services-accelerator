import { TestBed, inject } from '@angular/core/testing';
import * as fromReducer from '../store/reducers';
import { Store, StoreModule } from '@ngrx/store';
import { Type } from '@angular/core';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { PolicyService } from './policy.service';
import { PolicyDataService } from './policy-data.service';
import * as fromAction from '../store/actions';

const userId = 'testUser';
const policyId = 'PL00001';
const contractId = 'CT00001';
const testCategory = 'testCategory';

describe('PolicyServiceTest', () => {
  let service: PolicyService;
  let store: Store<fromReducer.UserState>;
  let policyData: PolicyDataServiceStub;

  class PolicyDataServiceStub {
    userId = userId;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        PolicyService,
        reducerProvider,
        { provide: PolicyDataService, useClass: PolicyDataServiceStub },
      ],
    });

    service = TestBed.get(PolicyService as Type<PolicyService>);
    policyData = TestBed.get(PolicyDataService as Type<PolicyDataService>);
    store = TestBed.get(Store as Type<Store<fromReducer.UserState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should PolicyService is injected', inject(
    [PolicyService],
    (policyService: PolicyService) => {
      expect(policyService).toBeTruthy();
    }
  ));

  it('should be able to get policies if data exists', () => {
    store.dispatch(
      new fromAction.LoadPoliciesSuccess({
        policyId: policyId,
        contractId: contractId,
      })
    );
    let policiesResponse;
    service
      .getPolicies()
      .subscribe(policies => {
        policiesResponse = policies;
      })
      .unsubscribe();
    expect(policiesResponse).toEqual({
      policyId: policyId,
      contractId: contractId,
    });
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

  it('should be able to load premium calendar', () => {
    service.loadPremiumCalendar();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadPremiumCalendar({ userId: userId })
    );
  });
});
