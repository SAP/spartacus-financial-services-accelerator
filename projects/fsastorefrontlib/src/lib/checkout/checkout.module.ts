import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SpinnerModule,
  CmsPageGuard,
  PageLayoutComponent,
  PageComponentModule,
  PaymentMethodModule,
  PaymentFormModule,
  MediaModule,
  CartNotEmptyGuard,
  PaymentDetailsSetGuard,
  OrderConfirmationGuard
} from '@spartacus/storefront';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutingConfig,
  RoutesConfig
} from '@spartacus/core';

import { AccordionModule } from '../accordion/accordion.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { PaymentDetailsComponent } from './assets/components/payment-details/payment-details.component';
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';
import { FSMiniCartComponent } from './assets/components/mini-cart/mini-cart.component';
import { effects } from './assets/store/effects';
import { FSCartService } from './assets/services';
import { OccFSCartService } from '../occ/cart/fs-cart.service';

const routes: Routes = [
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options'// ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent // SPA LAYOUT Component you're targeting
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quoteReview',
      pageLabel: 'quote-review'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'checkoutPaymentDetails',
      pageLabel: 'checkout-payment-details'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CartNotEmptyGuard,
      PaymentDetailsSetGuard
    ],
    data: {
      cxRoute: 'finalReview',
      pageLabel: 'final-review'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      // OrderConfirmationGuard
    ],
    data: {
      cxRoute: 'orderConfirm',
      pageLabel: 'orderConfirmationPage'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    PaymentMethodModule,
    PaymentFormModule,
    I18nModule,
    NgbTooltipModule,
    CommonModule,
    PageComponentModule,
    MediaModule,
    SpinnerModule,
    AccordionModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AddOptionsFlex: { // mapping hybris component (defined in impex) - This is acctualy flexType defined in impex for that component
          component: AddOptionsComponent // to SPA component
        },
        MiniCartFlex: {
          component: FSMiniCartComponent
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent
        },
        PaymentDetailsFlex: {
          component: PaymentDetailsComponent
        },
        FinalReviewFlex: {
          component: FinalReviewComponent
          // component: ReviewSubmitComponent
        },
        OrderConfirmationFlex: {
          component: FsaOrderConfirmationComponent
        }
      },
      routing: {
        routes: {
          addOptions: {
            paths: ['checkout/add-options']
          },
          quoteReview: {
            paths: ['checkout/quote-review']
          },
          checkoutPaymentDetails: {
            paths: ['checkout/payment-details']
          },
          finalReview: {
            paths: ['checkout/final-review']
          },
          orderConfirm: {
            paths: ['checkout/order-confirmation']
          }
        }
      }
    })
  ],
  declarations: [
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    PaymentDetailsComponent,
    AddOptionsComponent,
    FSMiniCartComponent
  ],
  exports: [
    I18nModule,
    PaymentMethodModule,
    PaymentFormModule,
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    PaymentDetailsComponent,
    FSMiniCartComponent
  ],
  entryComponents: [
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    QuoteReviewComponent,
    PaymentDetailsComponent,
    FinalReviewComponent,
    FSMiniCartComponent
  ],
  providers: [ FSCartService, OccFSCartService ]
})
export class CheckoutModule {
}
