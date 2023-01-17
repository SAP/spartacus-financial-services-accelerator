import { NgModule } from '@angular/core';
import { AsmModule } from '@spartacus/asm';
import { AsmOccModule } from '@spartacus/asm/occ';
import { CartPageEventModule } from "@spartacus/cart/base/core";
import { CheckoutModule } from "@spartacus/checkout/base";
import { CheckoutOccModule } from "@spartacus/checkout/base/occ";
// check TODO:Spartacus - // TODO:Spartacus - Class CartModule has been removed and is no longer part of the public API. The cart base feature is now extracted to a lazy loadable library @spartacus/cart/base.  See the release documentation for more information.  While it's not identical, the new module 'CartBaseCoreModule' in '@spartacus/cart/base/core' is the closest equivalent in the new cart library.
// check TODO:Spartacus - // TODO:Spartacus - Class CartOccModule has been removed and is no longer part of the public API. The cart base feature is now extracted to a lazy loadable library @spartacus/cart/base.  See the release documentation for more information.  While it's not identical, the new module 'CartBaseOccModule' in '@spartacus/cart/base/occ' is the closest equivalent in the new cart library.
// removed TODO:Spartacus - // TODO:Spartacus - Class UserOccTransitionalModule has been removed and is no longer part of the public API. 
// removed TODO:Spartacus - // TODO:Spartacus - Class UserTransitionalModule has been removed and is no longer part of the public API. 
import {
  AnonymousConsentsModule,
  AuthModule,
  CmsOccModule,
  CostCenterOccModule,
  ExternalRoutesModule,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule
} from '@spartacus/core';
import { CartBaseCoreModule } from '@spartacus/cart/base/core';
import { CartBaseOccModule } from '@spartacus/cart/base/occ';
//import { OrderConfirmationModule } from '@spartacus/order/components';
import { OrderCancellationModule, OrderDetailsModule, OrderHistoryModule, OrderReturnModule, ReturnRequestDetailModule, ReturnRequestListModule } from "@spartacus/order/components";
import { OrderOccModule } from "@spartacus/order/occ";
import { SmartEditModule } from '@spartacus/smartedit';
// removed TODO:Spartacus - // TODO:Spartacus - Class CartComponentModule has been removed and is no longer part of the public API. The cart base feature is now extracted to a lazy loadable library @spartacus/cart/base.  See the release documentation for more information.  
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
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
  PageTitleModule,
  PaymentMethodsModule,
  PDFModule,
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
  ScrollToTopModule,
  SiteContextSelectorModule,
  TabParagraphContainerModule,
  UserComponentModule
} from '@spartacus/storefront';

import { UserAccountModule } from '@spartacus/user/account';
import { UserAccountComponentsModule } from '@spartacus/user/account/components';
import { UserProfileModule } from '@spartacus/user/profile';
import {
  CloseAccountModule,
  ForgotPasswordModule,
  ResetPasswordModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule
} from '@spartacus/user/profile/components';
import { environment } from '../../environments/environment';
import { AdministrationFeatureModule } from './features/administration-feature.module';
import { AsmFeatureModule } from './features/asm-feature.module';
import { BulkPricingFeatureModule } from './features/bulk-pricing-feature.module';
import { CheckoutFeatureModule } from './features/checkout-feature.module';
import { DigitalPaymentsFeatureModule } from './features/digital-payments-feature.module';
import { OrderApprovalFeatureModule } from './features/order-approval-feature.module';
import { ProductConfiguratorTextfieldFeatureModule } from './features/product-configurator-textfield-feature.module';
import { QuickOrderFeatureModule } from './features/quick-order-feature.module';
import { SavedCartFeatureModule } from './features/saved-cart-feature.module';
import { SmartEditFeatureModule } from './features/smartedit-feature.module';
import { StorefinderFeatureModule } from './features/storefinder-feature.module';
import { TrackingFeatureModule } from './features/tracking-feature.module';
import { UserFeatureModule } from './features/user-feature.module';
import { VariantsFeatureModule } from './features/variants-feature.module';
import { CartBaseFeatureModule } from './features/cart-base-feature.module';
import { VideoModule } from '@spartacus/storefront';
import { CheckoutB2BOccModule } from '@spartacus/checkout/b2b/occ';

const featureModules = [];

if (environment.digitalPayments) {
  featureModules.push(DigitalPaymentsFeatureModule);
}

@NgModule({
  imports: [
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
    SiteContextSelectorModule,
    AddressBookModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    PageTitleModule,
    PDFModule,
    ScrollToTopModule,
    VideoModule,

    /************************* User Core *************************/
    UserModule,
    UserOccModule,
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
    CartBaseOccModule, // TODO:Spartacus CartModule.forRoot() replaced
    CheckoutOccModule,
    CheckoutB2BOccModule,
    OrderOccModule,
    ProductOccModule,
    UserOccModule,
    CostCenterOccModule,
    CmsOccModule,

    /************************* Cart & Order *************************/
    CartBaseCoreModule,
    CartBaseOccModule,
    CartBaseFeatureModule, // TODO:Spartacus replaced CartComponentModule
    MyCouponsModule,
    CostCenterOccModule,

    OrderHistoryModule,
    OrderDetailsModule,
    OrderCancellationModule,
    OrderReturnModule,

    /************************* Page Events *************************/
    NavigationEventModule,
    HomePageEventModule,
    CartPageEventModule,
    ProductPageEventModule,

    /************************* Core My Account *************************/
    //OrderConfirmationModule,
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
    ...featureModules,
  ],
})
export class FSFeaturesModule { }
