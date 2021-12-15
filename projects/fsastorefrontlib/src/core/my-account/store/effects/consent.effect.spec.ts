import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './consent.effect';
import * as fromReducer from './../../store/reducers/index';
import { ConsentConnector } from '../../connectors/consent.connector';
import {
  Address,
  CartActions,
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
  RoutingService,
} from '@spartacus/core';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import createSpy = jasmine.createSpy;

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
const cart = {
  code: 'cartCode',
};
const mockUser = {
  uid: 'consentHolder',
};
const oboCustomer = {
  uid: 'customerToTransferCartTo',
};
const address: Address = {
  companyName: 'msg Global Digital',
  defaultAddress: true,
};

class MockConsentConnector {
  getConsents() {
    return of(consentList);
  }
  transferCart() {
    return of({});
  }
  createAddressForUser() {
    return of(address);
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
  remove = jasmine.createSpy();
}

class MockRoutingService {
  go = createSpy();
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
        { provide: RoutingService, useClass: MockRoutingService },
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

  describe('transferCart$', () => {
    it('should transfer cart to obo customer from consent holder', () => {
      const action = new fromActions.TransferCart({
        cart: cart,
        consentHolder: mockUser,
        oboCustomer: oboCustomer,
      });
      const transferCartSuccess = new fromActions.TransferCartSuccess();
      const removeCartSuccess = new CartActions.RemoveCart({
        cartId: 'cartCode',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: transferCartSuccess,
        c: removeCartSuccess,
      });
      expect(effects.transferCart$).toBeObservable(expected);
    });
  });

  describe('createAddressForUser$', () => {
    it('should create address for OBO customer by consent holder', () => {
      const action = new fromActions.CreateAddress({
        userId: mockUser,
        oboCustomerId: oboCustomer,
        address: address,
      });
      const createAddressSuccess = new fromActions.CreateAddressSuccess(
        address
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: createAddressSuccess,
      });
      expect(effects.createAddressForUser$).toBeObservable(expected);
    });
  });
});
