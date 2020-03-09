import { NgModule } from '@angular/core';
import { BannerModule } from './banner/banner.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CategoryFormsModule } from './form/cms-category-form-component/cms-category-forms.module';
import { CustomContainerModule } from './container/cms-custom-container.module';
import { AgentModule } from './agent/agent.module';
import { MyAccountModule } from './my-account/myaccount.module';
import { effects } from '../core/my-account/store/effects/index';
import {
  reducerProvider,
  reducerToken,
} from '../core/my-account/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserRequestModule } from './fnol/fnol.module';
import { CategoryFeatureModule } from './category/category-feature/category-feature.module';
import { CategoryFeatureCarouselModule } from './category/category-feature-carousel/category-feature-carousel.module';
import { FSRegisterModule } from './user/register/fs-register.module';
import { ProductModule } from './product/product.module';
import { ChangeProcessModule } from './change-process/change-process.module';
import { ProductAssignmentModule } from './product-assignment/product-assignment.module';
import { FSProgressBarModule } from './progress-bar/progress-bar.module';

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
    UserRequestModule,
    ChangeProcessModule,
    StoreModule.forFeature('assets', reducerToken),
    EffectsModule.forFeature(effects),
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    ProductAssignmentModule,
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
    UserRequestModule,
    ChangeProcessModule,
    CategoryFeatureModule,
    CategoryFeatureCarouselModule,
    ProductAssignmentModule,
    FSProgressBarModule,
  ],
  providers: [reducerProvider],
})
export class CmsLibModule {}
