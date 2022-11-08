import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule, MediaModule } from '@spartacus/storefront';

import { ProductOverviewComponent } from './product-overview.component';

@NgModule({
  imports: [CommonModule, IconModule, MediaModule, RouterModule, I18nModule],
  declarations: [ProductOverviewComponent],
  exports: [ProductOverviewComponent],
})
export class ProductOverviewModule {}
