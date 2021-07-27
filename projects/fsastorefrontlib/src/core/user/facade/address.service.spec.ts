import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CheckoutDeliveryService, StateWithUser, User } from '@spartacus/core';
import { FSAddressService } from './address.service';

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

class MockCheckoutDeliveryService {
  setDeliveryAddress() {}
  createAndSetAddress() {}
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
