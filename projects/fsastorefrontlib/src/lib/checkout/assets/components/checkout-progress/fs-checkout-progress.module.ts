import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  Config,
  ConfigModule,
  I18nModule,
  UrlModule
} from '@spartacus/core';
import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutProgressComponent } from './fs-checkout-progress.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: FSCheckoutProgressComponent
        }
      }
    })
  ],
  declarations: [FSCheckoutProgressComponent],
  entryComponents: [FSCheckoutProgressComponent],
  exports: [FSCheckoutProgressComponent],
  providers: [{ provide: CheckoutConfig, useExisting: Config }]
})
export class FSCheckoutProgressModule {}
