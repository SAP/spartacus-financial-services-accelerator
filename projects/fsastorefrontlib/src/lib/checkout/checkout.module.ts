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
  CardModule,
  PaymentMethodComponent
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
import { AddOptionsComponent } from './assets/components/add-options/add-options.component';
import { FSMiniCartComponent } from './assets/components/mini-cart/mini-cart.component';
import { effects } from './assets/store/effects';
import { FSCartService } from './assets/services';
import { OccFSCartService } from '../occ/cart/fs-cart.service';
import { GeneralInformationPageContainer } from './assets/components/forms/travel/general-information-form-container';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'generalInformationForm',
      pageLabel: 'generalInformationForm'
    },
    component: PageLayoutComponent
  },
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
          component: PaymentMethodComponent
        },
        FinalReviewFlex: {
          component: FinalReviewComponent
        },
        OrderConfirmationFlex: {
          component: FsaOrderConfirmationComponent
        },
        CMSCustomDefineStyleCMSComponentsContainer: {
          component: GeneralInformationPageContainer
        }
      }
    })
  ],
  declarations: [
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    FSMiniCartComponent,
    GeneralInformationPageContainer
  ],
  exports: [
    I18nModule,
    PaymentMethodModule,
    PaymentFormModule,
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    FSMiniCartComponent,
    GeneralInformationPageContainer
  ],
  entryComponents: [
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    QuoteReviewComponent,
    FinalReviewComponent,
    FSMiniCartComponent,
    GeneralInformationPageContainer
  ],
  providers: [ FSCartService, OccFSCartService ]
})
export class CheckoutModule {
}
