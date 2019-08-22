import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { FsPaymentMethodComponent } from './fs-payment-method.component';
import {
  CardModule,
  CartNotEmptyGuard,
  DeliveryModeSetGuard,
  PaymentFormModule,
  ShippingAddressSetGuard,
  SpinnerModule
} from '@spartacus/storefront';
import {FsPaymentFormModule} from './payment-form/fs-payment-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: FsPaymentMethodComponent,
          guards: [
            AuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
            DeliveryModeSetGuard,
          ],
        },
      },
    }),
    FsPaymentFormModule,
  ],
  providers: [UserService],
  declarations: [FsPaymentMethodComponent],
  entryComponents: [FsPaymentMethodComponent],
  exports: [FsPaymentMethodComponent],
})
export class FsPaymentMethodModule {}
