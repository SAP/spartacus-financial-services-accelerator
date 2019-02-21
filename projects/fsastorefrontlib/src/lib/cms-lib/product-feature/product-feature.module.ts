import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFeatureComponent } from './product-feature-component';
import { ConfigModule, CmsConfig } from '@spartacus/core'

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FinancialServicesProductFeatureComponent: { selector: 'fsa-product-feature' }
      }
    }),],
  declarations: [ProductFeatureComponent],
  exports: [ProductFeatureComponent],
  entryComponents: [ProductFeatureComponent]
})
export class ProductFeatureModule { }
