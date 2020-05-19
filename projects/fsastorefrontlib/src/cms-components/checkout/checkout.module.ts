import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormModule } from '@fsa/dynamicforms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { CartConnector } from '../../core/cart/connectors/cart.connector';
import { FSCartService } from '../../core/cart/facade/cart.service';
import { CheckoutConnector } from '../../core/checkout/connectors/checkout.connector';
import { CategoryService } from '../../core/checkout/services/category/category.service';
import { CHECKOUT_FEATURE } from '../../core/checkout/store';
import { effects } from '../../core/checkout/store/effects/index';
import {
  reducerProvider,
  reducerToken,
} from '../../core/checkout/store/reducers/index';
import { QuoteConnector } from '../../core/my-account/connectors/quote.connector';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { AddOptionsModule } from './components/add-options/add-options.module';
import { BindQuoteDialogComponent } from './components/bind-quote-dialog/bind-quote-dialog.component';
import { FSCheckoutProgressComponent } from './components/checkout-progress/checkout-progress.component';
import { FSCheckoutProgressModule } from './components/checkout-progress/checkout-progress.module';
import { ChooseCoverNavigationComponent } from './components/choose-cover-navigation/choose-cover-navigation.component';
import { ProductConfigurationFormComponent } from './components/configure-product/form/product-configuration-form.component';
import { ProductConfigurationMiniCartComponent } from './components/configure-product/mini-cart/product-configuration-mini-cart.component';
import { ProductConfigurationNavigationComponent } from './components/configure-product/navigation/product-configuration-navigation.component';
import { FinalReviewComponent } from './components/final-review/final-review.component';
import { FormComponentsModule } from './components/form-components/form-component.module';
import { LegalModule } from './components/legal/legal.module';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { MiniCartModule } from './components/mini-cart/mini-cart.module';
import { OrderConfirmationMessageComponent } from './components/order-confirmation-message/order-confirmation-message.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { PersonalDetailsNavigationComponent } from './components/personal-details-navigation/personal-details-navigation.component';
import { QuoteReviewComponent } from './components/quote-review/quote-review.component';
import { UserIdentificationModule } from './components/user-identification/user-identification.module';
import { CategoryStepGuard } from './guards/category-step-guard';
import { CheckoutStepGuard } from './guards/checkout-step-guard';

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
    path: null,
    canActivate: [CmsPageGuard, CategoryStepGuard],
    data: {
      cxRoute: 'configureProduct',
      pageLabel: 'productDetails',
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
    canActivate: [AuthGuard, CmsPageGuard, CheckoutStepGuard],
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
    canActivate: [AuthGuard, CmsPageGuard, CheckoutStepGuard],
    data: {
      cxRoute: 'legalInformation',
      pageLabel: 'legalInformationPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, CheckoutStepGuard],
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
    FormComponentsModule,
    DynamicFormModule,
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
          component: MiniCartComponent,
        },
        QuoteReviewFlex: {
          component: QuoteReviewComponent,
        },
        ProductConfigurationFormFlex: {
          component: ProductConfigurationFormComponent,
        },
        ProductConfigurationMiniCartFlex: {
          component: ProductConfigurationMiniCartComponent,
        },
        ProductConfigurationFormNavigationFlex: {
          component: ProductConfigurationNavigationComponent,
        },
        PaymentDetailsFlex: {
          component: PaymentMethodComponent,
        },
        FinalReviewFlex: {
          component: FinalReviewComponent,
        },
        OrderConfirmationFlex: {
          component: OrderConfirmationComponent,
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
    OrderConfirmationComponent,
    OrderConfirmationMessageComponent,
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  exports: [
    I18nModule,
    LegalModule,
    UserIdentificationModule,
    PaymentMethodModule,
    PaymentFormModule,
    FormComponentsModule,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    FinalReviewComponent,
    OrderConfirmationComponent,
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  entryComponents: [
    AddOptionsComponent,
    QuoteReviewComponent,
    BindQuoteDialogComponent,
    FinalReviewComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
    OrderConfirmationComponent,
    OrderConfirmationMessageComponent,
    MiniCartComponent,
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  providers: [
    FSCartService,
    CheckoutConnector,
    CartConnector,
    QuoteConnector,
    CategoryService,
    reducerProvider,
  ],
})
export class CheckoutModule {}
