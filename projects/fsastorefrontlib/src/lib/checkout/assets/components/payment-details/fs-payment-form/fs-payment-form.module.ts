import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ɵd  as CardModule } from '@spartacus/storefront';
import { ɵs  as PaymentFormModule } from '@spartacus/storefront';
import { ɵt  as BillingAddressFormModule } from '@spartacus/storefront';
import { ɵb  as BootstrapModule } from '@spartacus/storefront';
import { FSPaymentFormComponent } from './fs-payment-form.component';
import { CheckoutService } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BootstrapModule,
    PaymentFormModule,
    CardModule,
    BillingAddressFormModule
  ],
  declarations: [FSPaymentFormComponent],
  entryComponents: [FSPaymentFormComponent],
  exports: [FSPaymentFormComponent],
  providers: [CheckoutService]
})
export class FSPaymentFormModule {}
