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
    },
  ],
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
});
