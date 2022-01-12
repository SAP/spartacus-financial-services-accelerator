import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  CartModule,
  CartOccModule,
  CmsOccModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  OrderOccModule,
  ProductModule,
  ProductOccModule,
  UserOccModule,
  UserOccTransitionalModule,
  UserTransitionalModule,
} from '@spartacus/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
  CartComponentModule,
  CartPageEventModule,
  CategoryNavigationModule,
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  FormErrorsModule,
  HamburgerMenuModule,
  HomePageEventModule,
  JsonLdBuilderModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  MyCouponsModule,
  NavigationEventModule,
  NavigationModule,
  OrderCancellationModule,
  OrderDetailsModule,
  OrderHistoryModule,
  OrderReturnModule,
  PageTitleModule,
  PaymentMethodsModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListingPageModule,
  ProductListModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  ReturnRequestDetailModule,
  ReturnRequestListModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  TabParagraphContainerModule,
  UserComponentModule,
} from '@spartacus/storefront';
import { AdministrationFeatureModule } from './features/administration-feature.module';
import { AsmFeatureModule } from './features/asm-feature.module';
import { BulkPricingFeatureModule } from './features/bulk-pricing-feature.module';
import { CheckoutFeatureModule } from './features/checkout-feature.module';
import { OrderApprovalFeatureModule } from './features/order-approval-feature.module';
import { ProductConfiguratorTextfieldFeatureModule } from './features/product-configurator-textfield-feature.module';
import { QuickOrderFeatureModule } from './features/quick-order-feature.module';
import { SavedCartFeatureModule } from './features/saved-cart-feature.module';
import { SmartEditFeatureModule } from './features/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking-feature.module';
import { UserFeatureModule } from './features/user-feature.module';
import { VariantsFeatureModule } from './features/variants-feature.module';
import { UserAccountModule } from '@spartacus/user/account';
import { UserProfileModule } from '@spartacus/user/profile';
import { AsmModule } from '@spartacus/asm';
import { SmartEditModule } from '@spartacus/smartedit';
import { CheckoutModule } from '@spartacus/checkout';
import { AsmOccModule } from '@spartacus/asm/occ';
import { CheckoutOccModule } from '@spartacus/checkout/occ';
import { OrderConfirmationModule } from '@spartacus/checkout/components';
import {
  CloseAccountModule,
  ForgotPasswordModule,
  ResetPasswordModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
} from '@spartacus/user/profile/components';
import { UserAccountComponentsModule } from '@spartacus/user/account/components';
import { DigitalPaymentsFeatureModule } from './features/digital-payments-feature.module';
import { environment } from './../../environments/environment';

const featureModules = [];

if (environment.digitalPayments) {
  featureModules.push(DigitalPaymentsFeatureModule);
}

@NgModule({
  imports: [
    ...featureModules,
    AsmModule,
    SmartEditModule,
    AuthModule.forRoot(),
    LogoutModule,
    LoginRouteModule,
    UserAccountComponentsModule,
    FormErrorsModule,
    /************************* CMS Modules *************************/
    HamburgerMenuModule,
    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    SearchBoxModule,
    SiteContextSelectorModule,
    AddressBookModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    PageTitleModule,

    /************************* User Core *************************/
    UserTransitionalModule,
    UserOccTransitionalModule,
    UserAccountModule,
    UserProfileModule,

    PaymentMethodsModule,
    ConsentManagementModule,

    /************************* Anonymous Consents Core *************************/
    AnonymousConsentsModule.forRoot(),
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,

    /************************* Product Core *************************/
    ProductModule.forRoot(),
    ProductOccModule,
    CheckoutModule,

    /************************* Product UI  *************************/
    ProductDetailsPageModule,
    ProductListingPageModule,
    ProductListModule,
    ProductFacetNavigationModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductIntroModule,

    /************************* OCC *************************/
    AsmOccModule,
    CartOccModule,
    CheckoutOccModule,
    OrderOccModule,
    ProductOccModule,
    UserOccModule,
    CostCenterOccModule,
    CmsOccModule,

    /************************* Cart & Order *************************/
    CartModule.forRoot(),
    CartOccModule,
    CartComponentModule,
    MyCouponsModule,
    CostCenterOccModule,

    OrderHistoryModule,
    OrderDetailsModule,
    OrderCancellationModule,
    OrderReturnModule,
    OrderOccModule,

    /************************* Page Events *************************/
    NavigationEventModule,
    HomePageEventModule,
    CartPageEventModule,
    ProductPageEventModule,

    /************************* Core My Account *************************/
    OrderConfirmationModule,
    UserComponentModule,
    CloseAccountModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    ForgotPasswordModule,
    ResetPasswordModule,

    /************************* Opt-in features *************************/

    ExternalRoutesModule.forRoot(),
    JsonLdBuilderModule,

    /************************* External features *************************/
    UserFeatureModule,
    CheckoutFeatureModule,
    AsmFeatureModule,
    StorefinderFeatureModule,
    SmartEditFeatureModule,
    TrackingFeatureModule,
    VariantsFeatureModule,
    SavedCartFeatureModule,
    QuickOrderFeatureModule,
    ProductConfiguratorTextfieldFeatureModule,
    AdministrationFeatureModule,
    BulkPricingFeatureModule,
    OrderApprovalFeatureModule,
    ReturnRequestListModule,
    ReturnRequestDetailModule,
  ],
})
export class FSFeaturesModule {}
