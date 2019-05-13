import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule, CmsPageGuard, PageLayoutComponent, PageComponentModule, MultiStepCheckoutModule } from '@spartacus/storefront';
import { AuthGuard, CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { AccordionModule } from '../accordion/accordion.module';
import { AddOptionsModule } from './assets/add-options.module';
import { MiniCartModule } from './assets/components/mini-cart/mini-cart.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { effects } from './assets/store/effects';
import { ɵu as PaymentMethodModule  } from '@spartacus/storefront';

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
  declarations: [QuoteReviewComponent, FinalReviewComponent, FsaOrderConfirmationComponent],
  exports: [
    PaymentMethodModule,
    AddOptionsModule,
    QuoteReviewComponent,
    MiniCartModule,
    MultiStepCheckoutModule,
    FinalReviewComponent,
    FsaOrderConfirmationComponent
  ],
  entryComponents: [FsaOrderConfirmationComponent]
})
export class CheckoutModule {
}
