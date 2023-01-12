import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromAction from '../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { PolicyService } from './policy.service';
import { OboCustomerService } from '@spartacus/dynamicforms';

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

class MockOboCustomerService {
  getOboCustomerUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('PolicyServiceTest', () => {
  let service: PolicyService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;
  let oboCustomerService: MockOboCustomerService;

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
        {
          provide: OboCustomerService,
          useClass: MockOboCustomerService,
        },
      ],
    });

    service = TestBed.inject(PolicyService);
    store = TestBed.inject(Store);
    oboCustomerService = TestBed.inject(OboCustomerService);

    spyOn(store, 'dispatch').and.callThrough();
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

  it('should be able to load premium calendar', () => {
    service.loadPremiumCalendar();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadPremiumCalendar({ userId: userId })
    );
  });

  it('should be able to load premium calendar', () => {
    store.dispatch(new fromAction.LoadPremiumCalendarSuccess(mockedPolicy));
    let loaded;
    service
      .getPremiumCalendar()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual(mockedPolicy);
  });

  it('should be able to check if premium calendar is loaded', () => {
    store.dispatch(new fromAction.LoadPremiumCalendarSuccess(mockedPolicy));
    let loaded;
    service
      .getPremiumCalendarLoaded()
      .subscribe(response => {
        loaded = response;
      })
      .unsubscribe();
    expect(loaded).toEqual(true);
  });
});
