import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from '../core/my-account/store/effects/index';
import {
  reducerProvider,
  reducerToken,
} from '../core/my-account/store/reducers/index';
import { AgentModule } from './agent/agent.module';
import { BannerModule } from './banner/banner.module';
import { CategoryFeatureCarouselModule } from './category/category-feature-carousel/category-feature-carousel.module';
import { CategoryFeatureModule } from './category/category-feature/category-feature.module';
import { ChangeProcessModule } from './change-process/change-process.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CustomContainerModule } from './container/cms-custom-container.module';
import { FnolModule } from './fnol/fnol.module';
import { CategoryFormsModule } from './form/cms-category-form-component/cms-category-forms.module';
import { MyAccountModule } from './my-account/myaccount.module';
import { ProductAssignmentModule } from './product-assignment/product-assignment.module';
import { ProductModule } from './product/product.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { FSRegisterModule } from './user/register/register.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  imports: [
    AgentModule,
    BannerModule,
    ProductModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    MyAccountModule,
    FSRegisterModule,
    FnolModule,
    ChangeProcessModule,
    EffectsModule.forFeature(effects),
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    ProductAssignmentModule,
    NotFoundModule,
  ],
  exports: [
    AgentModule,
    BannerModule,
    ProductModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    MyAccountModule,
    FSRegisterModule,
    FnolModule,
    ChangeProcessModule,
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    ProductAssignmentModule,
    ProgressBarModule,
    NotFoundModule,
  ],
  providers: [reducerProvider],
})
export class CmsLibModule {}
