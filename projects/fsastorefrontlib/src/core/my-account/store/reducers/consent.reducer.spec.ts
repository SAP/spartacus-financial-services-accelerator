import * as fromReducer from '../reducers/consent.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;

const code = '000001';
const date1 = 'date1';
const consentHolderName = 'chName';
const consentHolderUid = 'chUid';
const consentTemplateId = 'ctId';
const consentTemplateDesc = 'ctDesc';
const consentTemplateVersion = 'ctVersion';
const customerName = 'customerName';
const customerUid = 'customerUid';
const firstCartCode = 'test001';
const firstCategoryCode = 'testCategory1';
const firstQuoteId = 'test001';
const secondCartCode = 'test002';
const secondCategoryCode = 'testCategory2';
const secondQuoteId = 'test002';
const policyId = 'policyId';
const contractId = 'contractId';
const claimNumber = '0000001';

const mockedConsents = {
  consents: [
    {
      code: code,
      consentGivenDate: date1,
      consentHolders: [
        {
          name: consentHolderName,
          uid: consentHolderUid,
        },
      ],
      consentTemplate: {
        id: consentTemplateId,
        description: consentTemplateDesc,
        version: consentTemplateVersion,
      },
      customer: {
        name: customerName,
        uid: customerUid,
      },
      oboPermissionConfiguration: {
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
    },
  ],
};

const mockedCustomer = {
  name: customerName,
  uid: customerUid,
};

const mockedQuotes: any = [
  {
    cartCode: firstCartCode,
    defaultCategory: {
      code: firstCategoryCode,
    },
    quoteId: firstQuoteId,
  },
  {
    cartCode: secondCartCode,
    defaultCategory: {
      code: secondCategoryCode,
    },
    quoteId: secondQuoteId,
  },
];

const mockedPolicy: any = {
  policyId: policyId,
  contractId: contractId,
};

const mockedClaim = {
  claimNumber: claimNumber,
};

describe('Consent Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.ConsentAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CONSENTS_SUCCESS', () => {
    it('should load consents', () => {
      const action = new fromAction.LoadConsentsSuccess(mockedConsents);
      const state = fromReducer.reducer(initialState, action);
      expect(state.consents).toEqual(mockedConsents);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_CUSTOMER_SUCCESS', () => {
    it('should load customer', () => {
      const action = new fromAction.LoadCustomerSuccess(mockedCustomer);
      const state = fromReducer.reducer(initialState, action);
      expect(state.customer).toEqual(mockedCustomer);
    });
  });

  describe('LOAD_CUSTOMER_QUOTES_SUCCESS', () => {
    it('should load customer quotes', () => {
      const action = new fromAction.LoadCustomerQuotesSuccess(mockedQuotes);
      const state = fromReducer.reducer(initialState, action);
      expect(state.customerQuotes).toEqual({ ...mockedQuotes });
    });
  });

  describe('LOAD_CUSTOMER_POLICIES_SUCCESS', () => {
    it('should load customer policies', () => {
      const action = new fromAction.LoadCustomerPoliciesSuccess(mockedPolicy);
      const state = fromReducer.reducer(initialState, action);
      expect(state.customerPolicies).toEqual(mockedPolicy);
    });
  });

  describe('LOAD_CUSTOMER_CLAIMS_SUCCESS', () => {
    it('should load customer claims', () => {
      const action = new fromAction.LoadCustomerClaimsSuccess(mockedClaim);
      const state = fromReducer.reducer(initialState, action);
      expect(state.customerClaims).toEqual(mockedClaim);
    });
  });
});
