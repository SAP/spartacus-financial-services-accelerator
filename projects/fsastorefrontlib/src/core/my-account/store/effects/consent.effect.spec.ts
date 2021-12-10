import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './consent.effect';
import * as fromReducer from './../../store/reducers/index';
import { ConsentConnector } from '../../connectors/consent.connector';
import { GlobalMessageService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';

const code1 = '000001';
const date1 = 'date1';
const consentHolderName1 = 'chName1';
const consentHolderUid1 = 'chUid1';
const consentTemplateId1 = 'ctId1';
const consentTemplateDesc1 = 'ctDesc1';
const consentTemplateVersion1 = 'ctVersion1';
const customerName1 = 'customerName1';
const customerUid1 = 'customerUid1';

const code2 = '000002';
const date2 = 'date2';
const consentHolderName2 = 'chName2';
const consentHolderUid2 = 'chUid2';
const consentTemplateId2 = 'ctId2';
const consentTemplateDesc2 = 'ctDesc2';
const consentTemplateVersion2 = 'ctVersion2';
const customerName2 = 'customerName2';
const customerUid2 = 'customerUid2';

const customerName = 'customerName';
const customerUid = 'customerUid';

const firstCartCode = 'test001';
const firstCategoryCode = 'testCategory1';
const firstQuoteId = 'test001';
const secondCartCode = 'test002';
const secondCategoryCode = 'testCategory2';
const secondQuoteId = 'test002';

const firstPolicyNumber = 'test001';
const firstContractNumber = 'test001';
const firstPolicyCategoryCode = 'testCategoryCode';
const secondPolicyNumber = 'test002';
const secondContractNumber = 'test002';
const secondPolicyCategoryCode = 'testCategoryCode';

const claimId1 = 'testClaim001';
const claimId2 = 'testClaim002';
const claimId3 = 'testClaim003';
const requestId1 = 'testRequest001';
const requestId2 = 'testRequest002';
const requestId3 = 'testRequest003';

const consent1 = {
  code: code1,
  consentGivenDate: date1,
  consentHolders: [
    {
      name: consentHolderName1,
      uid: consentHolderUid1,
    },
  ],
  consentTemplate: {
    id: consentTemplateId1,
    description: consentTemplateDesc1,
    version: consentTemplateVersion1,
  },
  customer: {
    name: customerName1,
    uid: customerUid1,
  },
  oboConsentConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
};

const consent2 = {
  code: code2,
  consentGivenDate: date2,
  consentHolders: [
    {
      name: consentHolderName2,
      uid: consentHolderUid2,
    },
  ],
  consentTemplate: {
    id: consentTemplateId2,
    description: consentTemplateDesc2,
    version: consentTemplateVersion2,
  },
  customer: {
    name: customerName2,
    uid: customerUid2,
  },
  oboConsentConfiguration: {
    permissions: [
      {
        key: 'fnol',
        value: true,
      },
      {
        key: 'checkout',
        value: true,
      },
      {
        key: 'documents',
        value: true,
      },
    ],
  },
};

const consentList = [consent1, consent2];

const customer = {
  name: customerName,
  uid: customerUid,
};

const insuranceQuote1: any = {
  cartCode: firstCartCode,
  defaultCategory: {
    code: firstCategoryCode,
  },
  quoteId: firstQuoteId,
};

const insuranceQuote2: any = {
  cartCode: secondCartCode,
  defaultCategory: {
    code: secondCategoryCode,
  },
  quoteId: secondQuoteId,
};

const insuranceQuotes = {
  insuranceQuotes: [insuranceQuote1, insuranceQuote2],
};

const insurancePolicy1: any = {
  policyNumber: firstPolicyNumber,
  contractNumber: firstContractNumber,
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: firstPolicyCategoryCode,
  },
};
const insurancePolicy2: any = {
  policyNumber: secondPolicyNumber,
  contractNumber: secondContractNumber,
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: secondPolicyCategoryCode,
  },
};

const insurancePolicies = {
  insurancePolicies: [insurancePolicy1, insurancePolicy2],
};

const claim1 = {
  claimNumber: claimId1,
  claimStatus: 'OPEN',
  requestId: requestId1,
};
const claim2 = {
  claimNumber: claimId2,
  claimStatus: 'PROCESSING',
  requestId: requestId2,
};
const claim3 = {
  claimNumber: claimId3,
  claimStatus: 'OPEN',
  requestId: requestId3,
  locationOfLoss: {
    code: 'testCode',
  },
};
const claims = [claim1, claim2, claim3];

class MockConsentConnector {
  getConsents() {
    return of(consentList);
  }

  getOBOCustomer() {
    return of(customer);
  }

  getQuotesForOBOCustomer() {
    return of(insuranceQuotes);
  }

  getPoliciesForOBOCustomer() {
    return of(insurancePolicies);
  }

  getClaimsForOBOCustomer() {
    return of(claims);
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
  remove = jasmine.createSpy();
}

describe('Consent Effects', () => {
  let actions$: Observable<fromActions.ConsentAction>;
  let effects: fromEffects.ConsentEffects;
  let mockConsentConnector: MockConsentConnector;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    mockConsentConnector = new MockConsentConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromReducer.getReducers()),
      ],
      providers: [
        { provide: ConsentConnector, useValue: mockConsentConnector },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        fromEffects.ConsentEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.ConsentEffects);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('loadConsents$', () => {
    it('should return consents', () => {
      const action = new fromActions.LoadConsents({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadConsentsSuccess(consentList);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadConsents$).toBeObservable(expected);
    });

    it('should fail to return consents', () => {
      spyOn(mockConsentConnector, 'getConsents').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadConsents({
        userId: OCC_USER_ID_CURRENT,
      });
      const completion = new fromActions.LoadConsentsFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadConsents$).toBeObservable(expected);
    });
  });

  describe('loadCustomer$', () => {
    it('should return customer', () => {
      const action = new fromActions.LoadCustomer({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerSuccess(customer);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomer$).toBeObservable(expected);
    });

    it('should fail to return customer', () => {
      spyOn(mockConsentConnector, 'getOBOCustomer').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadCustomer({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomer$).toBeObservable(expected);
    });
  });

  describe('loadCustomerQuotes$', () => {
    it('should return customer quotes', () => {
      const action = new fromActions.LoadCustomerQuotes({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerQuotesSuccess(
        insuranceQuotes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerQuotes$).toBeObservable(expected);
    });

    it('should fail to return customer quotes', () => {
      spyOn(mockConsentConnector, 'getQuotesForOBOCustomer').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadCustomerQuotes({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerQuotesFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerQuotes$).toBeObservable(expected);
    });
  });

  describe('loadCustomerPolicies$', () => {
    it('should return customer policies', () => {
      const action = new fromActions.LoadCustomerPolicies({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerPoliciesSuccess(
        insurancePolicies
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerPolicies$).toBeObservable(expected);
    });

    it('should fail to return customer policies', () => {
      spyOn(mockConsentConnector, 'getPoliciesForOBOCustomer').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadCustomerPolicies({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerPoliciesFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerPolicies$).toBeObservable(expected);
    });
  });

  describe('loadCustomerClaims$', () => {
    it('should return customer claims', () => {
      const action = new fromActions.LoadCustomerClaims({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerClaimsSuccess(claims);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerClaims$).toBeObservable(expected);
    });

    it('should fail to return customer claims', () => {
      spyOn(mockConsentConnector, 'getClaimsForOBOCustomer').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadCustomerClaims({
        userId: OCC_USER_ID_CURRENT,
        customerId: 'testCustomerId',
      });
      const completion = new fromActions.LoadCustomerClaimsFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCustomerClaims$).toBeObservable(expected);
    });
  });
});
