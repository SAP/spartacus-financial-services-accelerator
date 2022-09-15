import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AddressValidation,
  Country,
  StateWithUser,
  User,
  UserAddressConnector,
} from '@spartacus/core';
import { CheckoutDeliveryService } from '@spartacus/checkout/core';
import { FSAddressService } from './address.service';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { OccValueListService } from '../../../occ/services/value-list/occ-value-list.service';

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
const mockCountries: Country[] = [
  {
    isocode: 'AD',
    name: 'Andorra',
  },
  {
    isocode: 'RS',
    name: 'Serbia',
  },
];

class MockCheckoutDeliveryService {
  setDeliveryAddress() {}
  createAndSetAddress() {}
}

class MockUserAddressConnector implements Partial<UserAddressConnector> {
  verify = createSpy('MockUserAddressConnector.verify Spy').and.returnValue(
    of(mockAddressVerificationResult)
  );
}

class MockOccValueListService {
  getValuesFromAPI() {
    return of({ values: mockCountries });
  }
}

describe('FSAddressService', () => {
  let service: FSAddressService;
  let store: Store<StateWithUser>;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let occValueListService: OccValueListService;
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
        {
          provide: OccValueListService,
          useClass: MockOccValueListService,
        },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(FSAddressService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
    occValueListService = TestBed.inject(OccValueListService);
  });

  it('should FSAddressService is injected', inject(
    [FSAddressService],
    (addressService: FSAddressService) => {
      expect(addressService).toBeTruthy();
    }
  ));

  it('should set delivery address for cart when user already has it', () => {
    spyOn(checkoutDeliveryService, 'setDeliveryAddress').and.callThrough();
    service.createAddress(formContent, mockUser.defaultAddress);
    expect(checkoutDeliveryService.setDeliveryAddress).toHaveBeenCalledWith(
      mockUser.defaultAddress
    );
  });

  it('should create delivery address', () => {
    spyOn(checkoutDeliveryService, 'createAndSetAddress').and.callThrough();
    service.createAddress(formContent, null);
    expect(checkoutDeliveryService.createAndSetAddress).toHaveBeenCalled();
  });

  it('should get countries', () => {
    spyOn(occValueListService, 'getValuesFromAPI').and.callThrough();
    service
      .getCountries()
      .subscribe(countries => expect(countries.length).toEqual(2))
      .unsubscribe();
  });
});
