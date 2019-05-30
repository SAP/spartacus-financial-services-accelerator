import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule, CmsPageGuard, PageLayoutComponent, PageComponentModule, MultiStepCheckoutModule } from '@spartacus/storefront';
import { AuthGuard, CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';

import { ɵu as PaymentMethodModule  } from '@spartacus/storefront';
import { ɵv as PaymentFormModule  } from '@spartacus/storefront';

import { AccordionModule } from '../accordion/accordion.module';
import { AddOptionsModule } from './assets/add-options.module';
import { MiniCartModule } from './assets/components/mini-cart/mini-cart.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './assets/components/payment-details/payment-details.component';
import { effects } from './assets/store/effects';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    component: PageLayoutComponent,
    data: { pageLabel: 'orderConfirmationPage', cxPath: 'orderConfirmation' },
  },
];

@NgModule({
  imports: [
    PaymentMethodModule,
    PaymentFormModule,
    I18nModule,
    CommonModule,
    PageComponentModule,
    MultiStepCheckoutModule,
    AddOptionsModule,
    ComponentsModule,
    AccordionModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationSPAComponent: { selector: 'fsa-order-confirmation' },
      }
    })
  ],
  declarations: [QuoteReviewComponent, FinalReviewComponent, FsaOrderConfirmationComponent, PaymentDetailsComponent],
  exports: [
    I18nModule,
    PaymentMethodModule,
    PaymentFormModule,
    AddOptionsModule,
    QuoteReviewComponent,
    MiniCartModule,
    MultiStepCheckoutModule,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    PaymentDetailsComponent
  ],
  entryComponents: [FsaOrderConfirmationComponent]
})
export class CheckoutModule {
}
