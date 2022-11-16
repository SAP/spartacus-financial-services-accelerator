import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  Translatable,
  UserIdService,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';
import { FSCart, FSUser, FSUserRole } from '../../../occ/occ-models/occ.models';
import * as fromAction from '../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { reducerProvider, reducerToken } from '../store/reducers';
import { ConsentService } from './consent.service';

const userId = OCC_USER_ID_CURRENT;
const customerId = 'testCustomerId';
const consentId = 'CL00001';
const mockUser: FSUser = {
  uid: 'test@user.com',
  firstName: 'Donna',
  lastName: 'Moore',
  roles: [FSUserRole.SELLER],
};
const mockOBOCustomer: FSUser = {
  uid: 'customerToTransferCartTo',
};
const mockCart: FSCart = {
  code: 'cartCode',
};
const address: Address = {
  companyName: 'Test Company',
  defaultAddress: true,
};

const oboConsentHolderUid = 'test@test.com';
const oboPermissionName = 'testPermission';
let oboPermissionValue = true;

class GlobalMessageServiceMock {
  add(_text: string | Translatable, _type: GlobalMessageType): void {}
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

class MockConsentConnector {
  updateOBOPermission(
    _customerUid: string,
    _permissionKey: string,
    _event: Event
  ) {
    return of();
  }
}

describe('ConsentServiceTest', () => {
  let service: ConsentService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;
  let mockedUserAccountFacade: UserAccountFacade;
  let consentConnector: ConsentConnector;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    userIdService = new MockUserIdService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        ConsentService,
        reducerProvider,
        { provide: UserIdService, useValue: userIdService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        {
          provide: ConsentConnector,
          useClass: MockConsentConnector,
        },
        { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
      ],
    });
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    service = TestBed.inject(ConsentService);
    store = TestBed.inject(Store);
    consentConnector = TestBed.inject(ConsentConnector);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if ConsentService is injected', inject(
    [ConsentService],
    (consentService: ConsentService) => {
      expect(consentService).toBeTruthy();
    }
  ));

  it('should be able to get consents if data exists', () => {
    store.dispatch(
      new fromAction.LoadConsentsSuccess({ consentId: consentId })
    );
    let consentsResponse;
    service
      .getConsents()
      .subscribe(consents => {
        consentsResponse = consents;
      })
      .unsubscribe();
    expect(consentsResponse).toEqual({ consentId: consentId });
  });

  it('should be able to get loaded consents flag', () => {
    store.dispatch(
      new fromAction.LoadConsentsSuccess({ consentId: consentId })
    );
    let consentsLoaded;
    service
      .getConsentsLoaded()
      .subscribe(loaded => {
        consentsLoaded = loaded;
      })
      .unsubscribe();
    expect(consentsLoaded).toEqual(true);
  });

  it('should be able to load consents', () => {
    service.loadConsents(userId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadConsents({ userId: userId })
    );
  });

  it('should be able to load customer', () => {
    service.loadCustomer(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomer({ userId: userId, customerId: customerId })
    );
  });

  it('should be able to update OBO Permissions to TRUE', () => {
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(consentConnector, 'updateOBOPermission').and.returnValue(
      of(userId, oboConsentHolderUid, oboPermissionName, oboPermissionValue)
    );
    service
      .updateOBOPermission(
        userId,
        oboConsentHolderUid,
        oboPermissionName,
        oboPermissionValue
      )
      .subscribe(() =>
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'consentManagementForm.message.success.given' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        )
      )
      .unsubscribe();
    expect(consentConnector.updateOBOPermission).toHaveBeenCalled();
  });

  it('should be able to update OBO Permissions to FALSE', () => {
    oboPermissionValue = false;
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(consentConnector, 'updateOBOPermission').and.returnValue(
      of(userId, oboConsentHolderUid, oboPermissionName, oboPermissionValue)
    );
    service
      .updateOBOPermission(
        userId,
        oboConsentHolderUid,
        oboPermissionName,
        oboPermissionValue
      )
      .subscribe(() =>
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'consentManagementForm.message.success.withdrawn' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        )
      )
      .unsubscribe();
    expect(consentConnector.updateOBOPermission).toHaveBeenCalled();
  });

  it('should be able to load customer quotes', () => {
    service.loadCustomerQuotes(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerQuotes({
        userId: userId,
        customerId: customerId,
      })
    );
  });
  it('should transfer cart to selected obo customer', () => {
    service.setSelectedOBOCustomer(mockUser);
    service.transferCartToSelectedOBOCustomer(
      mockCart,
      mockUser,
      mockOBOCustomer.uid
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.TransferCart({
        cart: mockCart,
        consentHolder: mockUser,
        oboCustomer: mockOBOCustomer.uid,
      })
    );
  });

  it('should be able to load customer policies', () => {
    service.loadCustomerPolicies(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerPolicies({
        userId: userId,
        customerId: customerId,
      })
    );
  });

  it('should be able to load customer claims', () => {
    service.loadCustomerClaims(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerClaims({
        userId: userId,
        customerId: customerId,
      })
    );
  });
  it('should allow cart transfer for the seller', () => {
    service.setSelectedOBOCustomer(mockOBOCustomer);
    service
      .isCartTransferAllowedForSeller()
      .subscribe(result => expect(result).toEqual(true))
      .unsubscribe();
  });

  it('should not allow cart transfer', () => {
    service.setSelectedOBOCustomer({});
    service
      .isCartTransferAllowedForSeller()
      .subscribe(result => expect(result).toEqual(false))
      .unsubscribe();
  });

  it('should select customer for cart transfer', () => {
    service.setSelectedOBOCustomer(mockOBOCustomer);
    service.selectedOBOCustomer$
      .subscribe(selectedCustomer =>
        expect(selectedCustomer.uid).toEqual(mockOBOCustomer.uid)
      )
      .unsubscribe();
  });

  it('should create address for specified customer by consent holder', () => {
    service.createAddressForUser(mockUser.uid, mockOBOCustomer.uid, address);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CreateAddress({
        userId: 'test@user.com',
        oboCustomerId: 'customerToTransferCartTo',
        address: address,
      })
    );
  });
});
