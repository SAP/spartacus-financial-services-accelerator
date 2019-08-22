import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentMethodComponent } from '@spartacus/storefront';

@Component({
  selector: 'fsa-payment-method',
  templateUrl: './fs-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPaymentMethodComponent extends PaymentMethodComponent {
}
