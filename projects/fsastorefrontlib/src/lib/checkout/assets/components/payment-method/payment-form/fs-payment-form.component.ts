import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { PaymentFormComponent } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { Country } from '@spartacus/core';


@Component({
  selector: 'fsa-payment-form',
  templateUrl: './fs-payment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsPaymentFormComponent extends PaymentFormComponent {
  showSameAsShippingAddressCheckbox(): Observable<boolean> {
    return combineLatest([this.countries$, this.shippingAddress$]).pipe(
      map(([countries, address]) => {
        return (
          countries !== undefined &&
          !!countries.filter(
            (country: Country): boolean =>
              address !== undefined &&
              country !== undefined &&
              address.country !== undefined &&
              country.isocode === address.country.isocode).length);
      })
    );
  }
}
