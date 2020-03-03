import { BindQuoteDialogComponent } from './components/bind-quote-dialog/bind-quote-dialog.component';
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
  RoutingConfig,
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
  SpinnerModule,
} from '@spartacus/storefront';
import { CategoryStepGuard } from './guards/category-step-guard';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { FSCheckoutProgressComponent } from './components/checkout-progress/fs-checkout-progress.component';
import { FSCheckoutProgressModule } from './components/checkout-progress/fs-checkout-progress.module';
import { FinalReviewComponent } from './components/final-review/final-review.component';
import { LegalModule } from './components/legal/legal.module';
import { FSMiniCartComponent } from './components/mini-cart/mini-cart.component';
import { FsaOrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderConfirmationMessageComponent } from './components/order-confirmation-message/order-confirmation-message.component';
import { QuoteReviewComponent } from './components/quote-review/quote-review.component';
import { UserIdentificationModule } from './components/user-identification/user-identification.module';
import { FSCartService } from '../../core/cart/facade/fs-cart.service';
import { CategoryService } from '../../core/checkout/services/category/category.service';
import { effects } from '../../core/checkout/store/effects/index';
import { FSCheckoutStepGuard } from './guards/fs-checkout-step-guard';
import {
  reducerToken,
  reducerProvider,
} from '../../core/checkout/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { CHECKOUT_FEATURE } from '../../core/checkout/store';
import { ChooseCoverNavigationComponent } from './components/choose-cover-navigation/choose-cover-navigation.component';
import { PersonalDetailsNavigationComponent } from './components/personal-details-navigation/personal-details-navigation.component';
import { FsCheckoutConnector } from '../../core/checkout/connectors/fs-checkout.connector';
import { FsCartConnector } from '../../core/cart/connectors/fs-cart.connector';
import { QuoteConnector } from '../../core/my-account/connectors/quote.connector';
import { AddOptionsModule } from './components/add-options/add-options.module';
import { MiniCartModule } from './components/mini-cart/mini-cart.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard, CategoryStepGuard],
    data: {
      cxRoute: 'generalInformation',
      pageLabel: 'generalInformationForm',
    },
    component: PageLayoutComponent,
  },
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options', // ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent, // SPA LAYOUT Component you're targeting
  },
  {
    path: null,
    canActivate: [CmsPageGuard, CategoryStepGuard, AuthGuard],
    data: {
      cxRoute: 'checkoutPersonalDetails',
      pageLabel: 'personal-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quoteReview',
      pageLabel: 'quote-review',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, FSCheckoutStepGuard],
    data: {
      cxRoute: 'checkoutPaymentDetails',
      pageLabel: 'checkout-payment-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CartNotEmptyGuard,
      PaymentDetailsSetGuard,
    ],
    data: {
      cxRoute: 'finalReview',
      pageLabel: 'final-review',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'orderConfirmation',
      pageLabel: 'orderConfirmationPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, FSCheckoutStepGuard],
    data: {
      cxRoute: 'legalInformation',
      pageLabel: 'legalInformationPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, FSCheckoutStepGuard],
    data: {
      cxRoute: 'userIdentification',
      pageLabel: 'userIdentificationPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    I18nModule,
    AddOptionsModule,
    MiniCartModule,
    NgbTooltipModule,
    CommonModule,
    PageComponentModule,
    MediaModule,
    SpinnerModule,
    AccordionModule,
    UserIdentificationModule,
    LegalModule,
    PaymentMethodModule,
    PaymentFormModule,
    CardModule,
    FSCheckoutProgressModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CHECKOUT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AddOptionsFlex: {
          // mapping hybris component (defined in impex) - This is acctualy flexType defined in impex for that component
          component: AddOptionsComponent, // to SPA component
        },
        MiniCartFlex: {
          component: FSMiniCartComponent,
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent,
        },
        PaymentDetailsFlex: {
          component: PaymentMethodComponent,
        },
        FinalReviewFlex: {
          component: FinalReviewComponent,
        },
        OrderConfirmationFlex: {
          component: FsaOrderConfirmationComponent,
        },
        OrderConfirmationMessageFlex: {
          component: OrderConfirmationMessageComponent,
        },
        DynamicProgressBarStepsComponent: {
          component: FSCheckoutProgressComponent,
        },
        ChooseCoverFormNavigationFlex: {
          component: ChooseCoverNavigationComponent,
        },
        PersonalDetailsFormNavigationFlex: {
          component: PersonalDetailsNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    FsaOrderConfirmationComponent,
    OrderConfirmationMessageComponent
  ],
  exports: [
    I18nModule,
    LegalModule,
    UserIdentificationModule,
    PaymentMethodModule,
    PaymentFormModule,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent
  ],
  entryComponents: [
    AddOptionsComponent,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    FsaOrderConfirmationComponent,
    OrderConfirmationMessageComponent,
    FSMiniCartComponent,
  ],
  providers: [
    FSCartService,
    FsCheckoutConnector,
    FsCartConnector,
    QuoteConnector,
    CategoryService,
    reducerProvider,
  ],
})
export class CheckoutModule {}
