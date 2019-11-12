import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFeatureComponent } from './product-feature.component';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { FSProductListComponent } from '../product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FinancialServicesProductFeatureComponent: {
          component: ProductFeatureComponent,
        },
        SearchResultsListComponent: {
          component: FSProductListComponent,
        },
      },
    }),
  ],
  declarations: [ProductFeatureComponent, FSProductListComponent],
  exports: [ProductFeatureComponent, FSProductListComponent],
  entryComponents: [ProductFeatureComponent, FSProductListComponent],
})
export class ProductFeatureModule {}
