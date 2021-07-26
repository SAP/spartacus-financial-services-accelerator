import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Address,
  CheckoutDeliveryService,
  StateWithProcess,
  StateWithUser,
  User,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';

@Injectable()
export class FSAddressService extends UserAddressService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {
    super(store, userIdService);
    this.loadAddresses();
  }

  protected readonly PERSONAL_DETAILS_FORM_GROUP = 'personalDetails';
  protected readonly STREET_NAME = 'street';
  protected readonly STREET_NUMBER = 'streetNumber';
  protected readonly CITY = 'city';
  protected readonly COUNTRY = 'country';
  protected readonly POSTAL_CODE = 'postcode';
  protected readonly PHONE_NUMBER = 'phoneNumber';

  createAddressData(
    formData: { [name: string]: Object },
    user: User,
    defaultAddress: Address
  ) {
    if (!!defaultAddress) {
      this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
    } else {
      const address: Address = {
        country: {
          isocode: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.COUNTRY],
        },
        firstName: user.firstName,
        lastName: user.lastName,
        line1: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NAME],
        line2: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NUMBER],
        town: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.CITY],
        postalCode:
          formData[this.PERSONAL_DETAILS_FORM_GROUP][this.POSTAL_CODE],
        phone: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.PHONE_NUMBER],
        defaultAddress: true,
        shippingAddress: true,
      };
      this.checkoutDeliveryService.createAndSetAddress(address);
    }
  }
}
