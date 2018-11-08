import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './container/product-details.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';

import { CmsModule } from '../../../cms/cms.module'; // some slots are loaded inside components (i.e. tabs)
import { BootstrapModule } from '../../../bootstrap.module';
// guards
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { ComponentsModule } from './../../../ui/components/components.module';
import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';
import { OutletModule } from '../../../outlet/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CartSharedModule,
    CmsModule,
    AddToCartModule,
    BootstrapModule,
    OutletModule
  ],
  declarations: [
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductReviewsComponent
  ],
  exports: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductImagesComponent,
    ProductReviewsComponent
  ]
})
export class ProductDetailsModule {}
