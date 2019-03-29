import { NgModule } from '@angular/core';
import { UserService, UrlTranslationModule, CheckoutService, CartDataService } from '@spartacus/core';
import { PaymentDetailsComponent } from './payment-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ɵr  as PaymentMethodModule } from '@spartacus/storefront';
import { ɵh  as SpinnerModule } from '@spartacus/storefront';
import { ɵd  as CardModule } from '@spartacus/storefront';
import { FSPaymentFormModule } from './fs-payment-form/fs-payment-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentMethodModule,
    FSPaymentFormModule,
    UrlTranslationModule,
    CardModule,
    SpinnerModule,
  ],
  providers: [UserService],
  declarations: [PaymentDetailsComponent],
  entryComponents: [PaymentDetailsComponent],
  exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
