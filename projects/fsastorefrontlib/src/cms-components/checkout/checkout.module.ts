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
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  CmsPageGuard,
  MediaModule,
  PageComponentModule,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartConnector } from '../../core/cart/connectors/cart.connector';
import { FSCartService } from '../../core/cart/facade/cart.service';
import { CheckoutConnector } from '../../core/checkout/connectors/checkout.connector';
import { BindQuoteGuard } from '../../core/checkout/guards/bind-quote.guard';
import { OrderConfirmationGuard } from '../../core/checkout/guards/order-confirmation.guard';
import { PersonalDetailsSetGuard } from '../../core/checkout/guards/personal-details-set.guard';
import { ReferredQuoteGuard } from '../../core/checkout/guards/referred-quote.guard';
import { CategoryService } from '../../core/checkout/services/category/category.service';
import { FSCheckoutStoreModule } from '../../core/checkout/store/checkout-store.module';
import { effects } from '../../core/checkout/store/effects/index';
import { reducerProvider } from '../../core/checkout/store/reducers/index';
import { QuoteConnector } from '../../core/my-account/connectors/quote.connector';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AutoPersonalDetailsGuard } from '../dynamic-forms/guards/auto-personal-details-guard';
import { LegalInformationSetGuard } from './../../core/checkout/guards/legal-information-set.guard';
import { QuoteNotBoundGuard } from './../../core/checkout/guards/quote-not-bound.guard';
import { FSTranslationService } from './../../core/i18n/facade/translation.service';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { AddOptionsModule } from './components/add-options/add-options.module';
import { BindQuoteDialogComponent } from './components/bind-quote-dialog/bind-quote-dialog.component';
import { FSCheckoutProgressComponent } from './components/checkout-progress/checkout-progress.component';
import { FSCheckoutProgressModule } from './components/checkout-progress/checkout-progress.module';
import { ChooseCoverNavigationComponent } from './components/choose-cover-navigation/choose-cover-navigation.component';
import { ProductConfigurationModule } from './components/configure-product/product-configuration.module';
import { FinalReviewComponent } from './components/final-review/final-review.component';
import { LegalModule } from './components/legal/legal.module';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { MiniCartModule } from './components/mini-cart/mini-cart.module';
import { OrderConfirmationMessageComponent } from './components/order-confirmation-message/order-confirmation-message.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { PersonalDetailsNavigationComponent } from './components/personal-details-navigation/personal-details-navigation.component';
import { QuoteReviewComponent } from './components/quote-review/quote-review.component';
import { ReferredQuoteDialogComponent } from './components/referred-quote/referred-quote-dialog.component';
import { UserIdentificationModule } from './components/user-identification/user-identification.module';
import { CategoryStepGuard } from './guards/category-step-guard';
import { CheckoutStepGuard } from './guards/checkout-step-guard';
import { FSPaymentMethodComponent } from './components/payment-method/payment-method.component';
import { FSCartCouponModule } from './components/cart-coupon/cart-coupon.module';
import { FSAddressService } from '../../core/user/facade/address.service';
import {
  CartNotEmptyGuard,
  PaymentFormModule,
  PaymentMethodModule,
} from '@spartacus/checkout/components';

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
    canActivate: [CmsPageGuard, BindQuoteGuard],
    data: {
      cxRoute: 'addOptions', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'add-options', // LABEL for ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent, // SPA LAYOUT Component you're targeting
  },
  {
    path: null,
    canActivate: [
      CmsPageGuard,
      CategoryStepGuard,
      AuthGuard,
      AutoPersonalDetailsGuard,
      BindQuoteGuard,
    ],
    data: {
      cxRoute: 'checkoutPersonalDetails',
      pageLabel: 'personal-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, PersonalDetailsSetGuard],
    data: {
      cxRoute: 'quoteReview',
      pageLabel: 'quote-review',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CheckoutStepGuard,
      QuoteNotBoundGuard,
      ReferredQuoteGuard,
    ],
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
      // PaymentDetailsSetGuard,
      ReferredQuoteGuard,
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
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CheckoutStepGuard,
      CartNotEmptyGuard,
      QuoteNotBoundGuard,
    ],
    data: {
      cxRoute: 'legalInformation',
      pageLabel: 'legalInformationPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [
      AuthGuard,
      CmsPageGuard,
      CheckoutStepGuard,
      CartNotEmptyGuard,
      QuoteNotBoundGuard,
      LegalInformationSetGuard,
    ],
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
    ProductConfigurationModule,
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
    UrlModule,
    FSCheckoutProgressModule,
    FSCheckoutStoreModule,
    FSCartCouponModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AddOptionsFlex: {
          // mapping hybris component (defined in impex) - This is acctualy flexType defined in impex for that component
          component: AddOptionsComponent, // to SPA component
        },
        MiniCartFlex: {
          component: MiniCartComponent,
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent,
        },
        PaymentDetailsFlex: {
          component: FSPaymentMethodComponent,
        },
        FinalReviewFlex: {
          component: FinalReviewComponent,
        },
        OrderConfirmationFlex: {
          component: OrderConfirmationComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationMessageFlex: {
          component: OrderConfirmationMessageComponent,
          guards: [OrderConfirmationGuard],
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
    ReferredQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    OrderConfirmationComponent,
    OrderConfirmationMessageComponent,
    FSPaymentMethodComponent,
  ],
  exports: [
    I18nModule,
    LegalModule,
    UserIdentificationModule,
    PaymentMethodModule,
    PaymentFormModule,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    ReferredQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    OrderConfirmationMessageComponent,
    OrderConfirmationComponent,
    FSPaymentMethodComponent,
  ],
  entryComponents: [
    AddOptionsComponent,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    ReferredQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    OrderConfirmationComponent,
    OrderConfirmationMessageComponent,
    MiniCartComponent,
    FSPaymentMethodComponent,
  ],
  providers: [
    FSCartService,
    FSTranslationService,
    CheckoutConnector,
    CartConnector,
    QuoteConnector,
    CategoryService,
    FSAddressService,
    reducerProvider,
  ],
})
export class CheckoutModule {}
