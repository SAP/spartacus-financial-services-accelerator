import { Injectable } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  User,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AddressService {
  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {}

  protected readonly PERSONAL_DETAILS_FORM_GROUP = 'personalDetails';
  protected readonly STREET_NAME = 'street';
  protected readonly STREET_NUMBER = 'streetNumber';
  protected readonly CITY = 'city';
  protected readonly COUNTRY = 'country';
  protected readonly POSTAL_CODE = 'postcode';
  protected readonly PHONE_NUMBER = 'phoneNumber';

  createAddressData(formData: { [name: string]: Object }, user: User) {
    if (Boolean(user.defaultAddress)) {
      this.checkoutDeliveryService.setDeliveryAddress(user.defaultAddress);
    } else {
      const address: Address = {};
      const countryIsocode =
        formData[this.PERSONAL_DETAILS_FORM_GROUP][this.COUNTRY];
      this.userAddressService.loadDeliveryCountries();
      this.userAddressService
        .getCountry(countryIsocode)
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
              address.shippingAddress= true;
              if (Boolean(address)) {
                this.checkoutDeliveryService.createAndSetAddress(address);
              }
            }
          })
        )
        .subscribe();
    }
  }
}
