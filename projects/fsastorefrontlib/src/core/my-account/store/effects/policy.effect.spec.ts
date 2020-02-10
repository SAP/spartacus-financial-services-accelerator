import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './policy.effect';
import * as fromUserReducers from './../../store/reducers/index';
import { PolicyConnector } from '../../services/policy';

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
const insurancePolicies = {
  insurancePolicies: [insurancePolicy1, insurancePolicy2],
};
const premiumCalendarPolicies = {
  insurancePolicies: [insurancePolicy2],
};

class MockOccPolicyAdapter {
  getPolicies() {
    return of(insurancePolicies);
  }
  getPolicy() {
    return of(insurancePolicy1);
  }
  getPremiumCalendar() {
    return of(premiumCalendarPolicies);
  }
}

describe('Policy Effects', () => {
  let actions$: Observable<fromActions.PolicyAction>;
  let effects: fromEffects.PolicyEffects;
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
        { provide: PolicyConnector, useValue: mockOccPolicyAdapter },
        fromEffects.PolicyEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.PolicyEffects as Type<
      fromEffects.PolicyEffects
    >);
  });

  describe('loadPolicies$', () => {
    it('should return policies', () => {
      const action = new fromActions.LoadPolicies({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPoliciesSuccess(insurancePolicies);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPolicies$).toBeObservable(expected);
    });

    it('should fail to return policies', () => {
      spyOn(mockOccPolicyAdapter, 'getPolicies').and.returnValue(
        throwError('Error')
      );

      const action = new fromActions.LoadPolicies({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPoliciesFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPolicies$).toBeObservable(expected);
    });
  });

  describe('loadPolicy$', () => {
    it('should return policy', () => {
      const action = new fromActions.LoadPolicyDetails({
        contractId: 'test001',
        policyId: 'test001',
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPolicyDetailsSuccess(
        insurancePolicy1
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPolicyDetails$).toBeObservable(expected);
    });

    it('should fail to return policy', () => {
      spyOn(mockOccPolicyAdapter, 'getPolicy').and.returnValue(
        throwError('Error')
      );

      const action = new fromActions.LoadPolicyDetails({
        contractId: 'test001',
        policyId: 'test001',
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPolicyDetailsFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPolicyDetails$).toBeObservable(expected);
    });
  });

  describe('premiumCalendar$', () => {
    it('should return premium calendar policies', () => {
      const action = new fromActions.LoadPremiumCalendar({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPremiumCalendarSuccess(
        premiumCalendarPolicies
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPremiumCalendar$).toBeObservable(expected);
    });

    it('should fail to return premium calendar policies', () => {
      spyOn(mockOccPolicyAdapter, 'getPremiumCalendar').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadPremiumCalendar({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadPremiumCalendarFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPremiumCalendar$).toBeObservable(expected);
    });
  });
});
