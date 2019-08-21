import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig
} from '@spartacus/core';
import {
  CardModule,
  CartNotEmptyGuard,
  CmsPageGuard,
  MediaModule,
  PageComponentModule,
  PageLayoutComponent,
  PaymentDetailsSetGuard,
  PaymentFormModule,
  PaymentMethodComponent,
  PaymentMethodModule,
  SpinnerModule
} from '@spartacus/storefront';
import { CatagoryStepGuard } from '../../cms-components/checkout/guards/cateogry-step-guard';
import { AccordionModule } from '../accordion/accordion.module';
import { OccFSCartService } from '../occ/cart/fs-cart.service';
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';
import { FSCheckoutProgressComponent } from './assets/components/checkout-progress/fs-checkout-progress.component';
import { FSCheckoutProgressModule } from './assets/components/checkout-progress/fs-checkout-progress.module';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';
import { FSMiniCartComponent } from './assets/components/mini-cart/mini-cart.component';
import { FsaOrderConfirmationComponent } from './assets/components/order-confirmation/order-confirmation.component';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { FSCartService } from './assets/services';
import { effects } from './assets/store/effects/index';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard, CatagoryStepGuard],
    data: {
      cxRoute: 'generalInformation',
      pageLabel: 'generalInformationForm'
    },
    component: PageLayoutComponent
  },
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options' // ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
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
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'orderConfirmation',
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
    CardModule,
    FSCheckoutProgressModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AddOptionsFlex: {
          // mapping hybris component (defined in impex) - This is acctualy flexType defined in impex for that component
          component: AddOptionsComponent // to SPA component
        },
        MiniCartFlex: {
          component: FSMiniCartComponent
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent
        },
        PaymentDetailsFlex: {
          component: PaymentMethodComponent
        },
        FinalReviewFlex: {
          component: FinalReviewComponent
        },
        OrderConfirmationFlex: {
          component: FsaOrderConfirmationComponent
        },
        DynamicProgressBarStepsComponent: {
          component: FSCheckoutProgressComponent
        }
      }
    })
  ],
  declarations: [
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
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
    FSMiniCartComponent
  ],
  entryComponents: [
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    QuoteReviewComponent,
    FinalReviewComponent,
    FSMiniCartComponent
  ],
  providers: [FSCartService, OccFSCartService]
})
export class CheckoutModule { }
