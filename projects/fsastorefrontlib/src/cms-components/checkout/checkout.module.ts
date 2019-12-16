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
import { OccFSCartAdapter } from '../../occ/services/cart/occ-fs-cart.adapter';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { FSCheckoutProgressComponent } from './components/checkout-progress/fs-checkout-progress.component';
import { FSCheckoutProgressModule } from './components/checkout-progress/fs-checkout-progress.module';
import { FinalReviewComponent } from './components/final-review/final-review.component';
import { LegalModule } from './components/legal/legal.module';
import { FSMiniCartComponent } from './components/mini-cart/mini-cart.component';
import { FsaOrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { QuoteReviewComponent } from './components/quote-review/quote-review.component';
import { UserIdentificationModule } from './components/user-identification/user-identification.module';
import { FSCartService } from '../../core/checkout/services/cart/fs-cart.service';
import { CategoryService } from '../../core/checkout/services/category/category.service';
import { effects } from '../../core/checkout/store/effects/index';
import { FSCheckoutStepGuard } from './guards/fs-checkout-step-guard';
import {
  reducerToken,
  reducerProvider,
} from '../../core/checkout/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { CHECKOUT_FEATURE } from '../../core/checkout/store';
import { OccFSCheckoutAdapter } from '../../occ/services/checkout/occ-fs-checkout.adapter';
import { ChooseCoverNavigationComponent } from './components/choose-cover-navigation/choose-cover-navigation.component';
import { PersonalDetailsNavigationComponent } from './components/personal-details-navigation/personal-details-navigation.component';

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
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    FSMiniCartComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
  ],
  exports: [
    I18nModule,
    LegalModule,
    UserIdentificationModule,
    PaymentMethodModule,
    PaymentFormModule,
    QuoteReviewComponent,
    FinalReviewComponent,
    FsaOrderConfirmationComponent,
    FSMiniCartComponent,
  ],
  entryComponents: [
    FsaOrderConfirmationComponent,
    AddOptionsComponent,
    QuoteReviewComponent,
    FinalReviewComponent,
    FSMiniCartComponent,
    ChooseCoverNavigationComponent,
    PersonalDetailsNavigationComponent,
  ],
  providers: [
    FSCartService,
    OccFSCheckoutAdapter,
    OccFSCartAdapter,
    CategoryService,
    reducerProvider,
  ],
})
export class CheckoutModule {}
