import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckoutDeliveryService } from '@spartacus/checkout/core';
import {
  Address,
  CommandService,
  StateWithProcess,
  StateWithUser,
  User,
  UserAddressConnector,
  UserAddressService,
  UserIdService,
} from '@spartacus/core';

@Injectable()
export class FSAddressService extends UserAddressService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected userAddressConnector: UserAddressConnector,
    protected commandService: CommandService
  ) {
    super(store, userIdService, userAddressConnector, commandService);
    this.loadAddresses();
  }

  protected readonly PERSONAL_DETAILS_FORM_GROUP = 'personalDetails';
  protected readonly FIRST_NAME = 'firstName';
  protected readonly LAST_NAME = 'lastName';
  protected readonly STREET_NAME = 'street';
  protected readonly STREET_NUMBER = 'streetNumber';
  protected readonly CITY = 'city';
  protected readonly COUNTRY = 'country';
  protected readonly POSTAL_CODE = 'postcode';
  protected readonly PHONE_NUMBER = 'phoneNumber';

  /**
   * @deprecated since 4.0
   * Not longer used. Declared attribute #user is never read.
   * Use {@link #createAddress({ [name: string]: Object }, Address)} instead.
   */
  createAddressData(
    formData: { [name: string]: Object },
    user: User,
    defaultAddress: Address
  ) {
    if (!!defaultAddress) {
      this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
    } else {
      this.checkoutDeliveryService.createAndSetAddress(
        this.populateAddressFromFormData(formData)
      );
    }
  }

  createAddress(formData: { [name: string]: Object }, defaultAddress: Address) {
    if (!!defaultAddress) {
      this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
    } else {
      this.checkoutDeliveryService.createAndSetAddress(
        this.populateAddressFromFormData(formData)
      );
    }
  }

  populateAddressFromFormData(formData: { [p: string]: Object }) {
    const address: Address = {
      country: {
        isocode: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.COUNTRY],
      },
      firstName: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.FIRST_NAME],
      lastName: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.LAST_NAME],
      line1: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NAME],
      line2: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NUMBER],
      town: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.CITY],
      postalCode: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.POSTAL_CODE],
      phone: formData[this.PERSONAL_DETAILS_FORM_GROUP][this.PHONE_NUMBER],
      defaultAddress: true,
      shippingAddress: true,
    };
    return address;
  }
}
