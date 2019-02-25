import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule, OutletModule } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table/comparison-table-container.component';
import { ComparisonTableTabComponent } from 'projects/fsastorefrontlib/src/lib/cms-lib/checkout/comparison-table/comparison-table-tab.component';
import { CmsModule } from '@spartacus/storefront';
import { ComparisonTablePanelComponent } from 'projects/fsastorefrontlib/src/lib/cms-lib/checkout/comparison-table/comparison-table-panel.component';
import { ComparisonTableItemComponent } from './comparison-table/comparison-table-product-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    OutletModule,
    CmsModule
  ],
  declarations: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent, ComparisonTableItemComponent],
  exports: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent,ComparisonTableItemComponent],
  entryComponents: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent,ComparisonTableItemComponent]
})
export class CheckoutModule {
}
