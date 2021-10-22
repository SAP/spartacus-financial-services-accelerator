import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AddressValidation,
  StateWithUser,
  User,
  UserAddressConnector,
} from '@spartacus/core';
import { CheckoutDeliveryService } from '@spartacus/checkout/core';
import { FSAddressService } from './address.service';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

const formContent = {
  personalDetails: {
    phoneNumber: '123456789',
    street: 'Omladinskih Brigada',
    streetNumber: '90G',
    city: 'Belgrade',
    postcode: '11000',
    country: 'RS',
  },
};

const user: User = {
  firstName: 'Mock',
  lastName: 'User',
};

const mockUser: User = {
  firstName: 'Mock',
  lastName: 'User',
  defaultAddress: {
    line1: 'Mock address',
    defaultAddress: true,
  },
};
const mockAddressVerificationResult: AddressValidation = {
  decision: 'ACCEPT',
};

class MockCheckoutDeliveryService {
  setDeliveryAddress() {}
  createAndSetAddress() {}
}

class MockUserAddressConnector implements Partial<UserAddressConnector> {
  verify = createSpy('MockUserAddressConnector.verify Spy').and.returnValue(
    of(mockAddressVerificationResult)
  );
}

describe('FSAddressService', () => {
  let service: FSAddressService;
  let store: Store<StateWithUser>;
  let checkoutDeliveryService: CheckoutDeliveryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FSAddressService,
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: UserAddressConnector,
          useClass: MockUserAddressConnector,
        },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(FSAddressService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
  });

  it('should FSAddressService is injected', inject(
    [FSAddressService],
    (addressService: FSAddressService) => {
      expect(addressService).toBeTruthy();
    }
  ));

  it('should set delivery address for cart when user already has it', () => {
    spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callThrough();
    service.createAddressData(formContent, mockUser, mockUser.defaultAddress);
    expect(checkoutDeliveryService.setDeliveryAddress).toHaveBeenCalledWith(
      mockUser.defaultAddress
    );
  });

  it('should create delivery address', () => {
    spyOn(checkoutDeliveryService, 'createAndSetAddress').and.callThrough();
    service.createAddressData(formContent, user, null);
    expect(checkoutDeliveryService.createAndSetAddress).toHaveBeenCalled();
  });
});
