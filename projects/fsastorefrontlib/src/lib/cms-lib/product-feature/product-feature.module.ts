import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFeatureComponent } from './product-feature-component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductFeatureComponent],
  exports: [ProductFeatureComponent],
  entryComponents: [ProductFeatureComponent]
})
export class ProductFeature { }
