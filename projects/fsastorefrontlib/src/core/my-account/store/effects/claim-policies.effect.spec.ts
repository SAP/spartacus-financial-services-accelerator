import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import { PolicyConnector } from './../../connectors/policy.connector';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './claim-policies.effect';

const insurancePolicy1: any = {
  policyNumber: 'test001',
  contractNumber: 'test001',
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: 'testCategoryCode',
  },
};
const insurancePolicy2: any = {
  policyNumber: 'test002',
  contractNumber: 'test002',
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: 'testCategoryCode',
  },
};
const claimPolicies = {
  insurancePolicies: [insurancePolicy1, insurancePolicy2],
};

class MockPolicyConnector {
  getPoliciesByCategory() {
    return of(claimPolicies);
  }
}

const errorObject = {
  errorMessage: 'Error message',
};

describe('Claim Policies Effects', () => {
  let actions$: Observable<fromActions.ClaimPoliciesAction>;
  let effects: fromEffects.ClaimPoliciesEffects;
  let mockPolicyConnector: MockPolicyConnector;

  beforeEach(() => {
    mockPolicyConnector = new MockPolicyConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromUserReducers.getReducers()),
      ],
      providers: [
        { provide: PolicyConnector, useValue: mockPolicyConnector },
        fromEffects.ClaimPoliciesEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ClaimPoliciesEffects);
  });

  describe('loadClaimPolicies$', () => {
    it('should return claim policies', () => {
      const action = new fromActions.LoadClaimPolicies({
        userId: OCC_USER_ID_CURRENT,
        policyCategoryCode: 'testCategoryCode',
      });
      const completion = new fromActions.LoadClaimPoliciesSuccess(
        claimPolicies
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadClaimPolicies$).toBeObservable(expected);
    });

    it('should fail to return claim policies', () => {
      spyOn(mockPolicyConnector, 'getPoliciesByCategory').and.returnValue(
        throwError(errorObject)
      );

      const action = new fromActions.LoadClaimPolicies({
        userId: OCC_USER_ID_CURRENT,
        policyCategoryCode: 'testCategoryCode',
      });
      const completion = new fromActions.LoadClaimPoliciesFail(
        JSON.stringify(errorObject)
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadClaimPolicies$).toBeObservable(expected);
    });
  });
});
