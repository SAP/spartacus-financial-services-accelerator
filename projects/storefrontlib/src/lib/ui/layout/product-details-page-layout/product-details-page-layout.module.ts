import { NgModule } from '@angular/core';
import { CmsModule } from '@spartacus/core';
import { ProductModule } from '@spartacus/core';
import { ProductDetailsPageLayoutComponent } from '@spartacus/storefront';


@NgModule({
  imports: [CmsModule, ProductModule],
  declarations: [ProductDetailsPageLayoutComponent],
  exports: [ProductDetailsPageLayoutComponent]
})
export class ProductDetailsPageLayoutModule {}
