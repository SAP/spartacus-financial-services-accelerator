import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserAccountCoreModule } from '@spartacus/user/account/core';
import { UserProfileCoreModule } from '@spartacus/user/profile/core';
import { effects } from '../core/my-account/store/effects/index';
import { reducerProvider } from '../core/my-account/store/reducers/index';
import { AgentModule } from './agent/agent.module';
import { AssetsTableModule } from './assets-table/assets-table.module';
import { B2bModule } from './b2b/b2b.module';
import { BannerModule } from './banner/banner.module';
import { CategoryFeatureCarouselModule } from './category/category-feature-carousel/category-feature-carousel.module';
import { CategoryFeatureModule } from './category/category-feature/category-feature.module';
import { ChangeProcessModule } from './change-process/change-process.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CustomContainerModule } from './container/cms-custom-container.module';
import { DashboardLinkModule } from './dashboard-link/dashboard-link.module';
import { FnolModule } from './fnol/fnol.module';
import { CmsFormSubmitModule } from './form/cms-form-submit/cms-form-submit.module';
import { GeneralInformationModule } from './form/general-information/general-information.module';
import { PersonalDetailsModule } from './form/personal-details/personal-details.module';
import { MessageNotificationModule } from './message-notification/message-notification.module';
import { MyAccountModule } from './my-account/myaccount.module';
import { NavigationModule } from './navigation';
import { FSSearchBoxModule } from './navigation/search-box/search-box.module';
import { NotFoundModule } from './not-found/not-found.module';
import { ProductModule } from './product/product.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { QuestionnaireCarouselModule } from './questionnaire-carousel/questionnaire-carousel.module';
import { SavingsIllustrationModule } from './savings-illustration/savings-illustration.module';
import { SellerDashboardModule } from './seller-dashboard/seller-dashboard.module';
import { CmsSyncPilotModule } from './sync-pilot/cms-sync-pilot/cms-sync-pilot.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { FSLoginFormModule } from './user/login-form/login-form.module';
import { FSRegisterModule } from './user/register/register.module';

@NgModule({
  imports: [
    AgentModule,
    BannerModule,
    ProductModule,
    ComparisonTableModule,
    CmsFormSubmitModule,
    CustomContainerModule,
    MyAccountModule,
    UserProfileModule,
    SellerDashboardModule,
    UserProfileCoreModule,
    UserAccountCoreModule,
    FSRegisterModule,
    FSLoginFormModule,
    FnolModule,
    ChangeProcessModule,
    EffectsModule.forFeature(effects),
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    NotFoundModule,
    PersonalDetailsModule,
    GeneralInformationModule,
    B2bModule,
    MessageNotificationModule,
    NavigationModule,
    CmsSyncPilotModule,
    QuestionnaireCarouselModule,
    FSSearchBoxModule,
    AssetsTableModule,
    DashboardLinkModule,
    SavingsIllustrationModule,
  ],
  exports: [
    AgentModule,
    BannerModule,
    ProductModule,
    ComparisonTableModule,
    CmsFormSubmitModule,
    CustomContainerModule,
    MyAccountModule,
    UserProfileModule,
    SellerDashboardModule,
    FSRegisterModule,
    FSLoginFormModule,
    FnolModule,
    ChangeProcessModule,
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    ProgressBarModule,
    NotFoundModule,
    PersonalDetailsModule,
    GeneralInformationModule,
    B2bModule,
    MessageNotificationModule,
    CmsSyncPilotModule,
    QuestionnaireCarouselModule,
    FSSearchBoxModule,
    AssetsTableModule,
    DashboardLinkModule,
    SavingsIllustrationModule,
  ],
  providers: [reducerProvider],
})
export class CmsLibModule {}
