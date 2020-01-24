import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './claim-policies.effect';
import * as fromUserReducers from './../../store/reducers/index';
import { OccPolicyAdapter } from './../../../../occ/services/policy/occ-policy.adapter';

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

class MockOccPolicyAdapter {
  getPoliciesByCategory() {
    return of(claimPolicies);
  }
}

describe('Claim Policies Effects', () => {
  let actions$: Observable<fromActions.ClaimPoliciesAction>;
  let effects: fromEffects.ClaimPoliciesEffects;
  let mockOccPolicyAdapter: MockOccPolicyAdapter;

  beforeEach(() => {
    mockOccPolicyAdapter = new MockOccPolicyAdapter();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromUserReducers.getReducers()),
      ],
      providers: [
        { provide: OccPolicyAdapter, useValue: mockOccPolicyAdapter },
        fromEffects.ClaimPoliciesEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.ClaimPoliciesEffects as Type<
      fromEffects.ClaimPoliciesEffects
    >);
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
      spyOn(mockOccPolicyAdapter, 'getPoliciesByCategory').and.returnValue(
        throwError('Error')
      );

      const action = new fromActions.LoadClaimPolicies({
        userId: OCC_USER_ID_CURRENT,
        policyCategoryCode: 'testCategoryCode',
      });
      const completion = new fromActions.LoadClaimPoliciesFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadClaimPolicies$).toBeObservable(expected);
    });
  });
});
