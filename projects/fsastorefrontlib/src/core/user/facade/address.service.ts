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
import { map } from 'rxjs/operators';

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

  createAddressData(formData: { [name: string]: Object }, user: User) {
    if (!!user.defaultAddress) {
      this.checkoutDeliveryService.setDeliveryAddress(user.defaultAddress);
    } else {
      const address: Address = {};
      const countryIsocode =
        formData[this.PERSONAL_DETAILS_FORM_GROUP][this.COUNTRY];
      this.loadDeliveryCountries();
      this.getCountry(countryIsocode)
        .pipe(
          map(country => {
            if (country) {
              address.country = country;
              address.firstName = user.firstName;
              address.lastName = user.lastName;
              address.line1 =
                formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NAME];
              address.line2 =
                formData[this.PERSONAL_DETAILS_FORM_GROUP][this.STREET_NUMBER];
              address.town =
                formData[this.PERSONAL_DETAILS_FORM_GROUP][this.CITY];
              address.postalCode =
                formData[this.PERSONAL_DETAILS_FORM_GROUP][this.POSTAL_CODE];
              address.phone =
                formData[this.PERSONAL_DETAILS_FORM_GROUP][this.PHONE_NUMBER];
              address.defaultAddress = true;
              address.shippingAddress = true;
              if (!!address) {
                this.checkoutDeliveryService.createAndSetAddress(address);
              }
            }
          })
        )
        .subscribe();
    }
  }
}
