import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  SpinnerModule,
  CmsPageGuard,
  PageLayoutComponent,
  PageComponentModule,
  // MultiStepCheckoutModule
} from '@spartacus/storefront';
import { AuthGuard, CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';

import { PaymentMethodModule, PaymentFormModule  } from '@spartacus/storefront';

import { AccordionModule } from '../accordion/accordion.module';
import { AddOptionsModule } from './assets/add-options.module';
import { MiniCartModule } from './assets/components/mini-cart/mini-cart.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './assets/components/payment-details/payment-details.component';
import { effects } from './assets/store/effects';
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';

const routes: Routes = [
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options'// ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent // SPA LAYOUT Component you're targeting
  }
];

@NgModule({
  imports: [
    PaymentMethodModule,
    PaymentFormModule,
    I18nModule,
    CommonModule,
    PageComponentModule,
    // MultiStepCheckoutModule,
    AddOptionsModule,
    SpinnerModule,
    AccordionModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AddOptionsFlexComponent: { // mapping hybris component (defined in impex)
          component: AddOptionsComponent // to SPA component
        }
      },
      routing: {
        routes: {
          addOptions: {
            paths: ['checkout/add-options'],
          }
        }
      }
      // cmsComponents: {
      //   OrderConfirmationSPAComponent: { selector: 'fsa-order-confirmation' },
      // }
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
    // MultiStepCheckoutModule,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    PaymentDetailsComponent
  ],
  entryComponents: [FsaOrderConfirmationComponent]
})
export class CheckoutModule {
}
