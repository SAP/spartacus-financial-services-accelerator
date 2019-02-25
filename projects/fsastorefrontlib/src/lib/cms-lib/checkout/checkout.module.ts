import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule, OutletModule } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table/comparison-table-container.component';
import { ComparisonTableTabComponent } from 'projects/fsastorefrontlib/src/lib/cms-lib/checkout/comparison-table/comparison-table-tab.component';
import { CmsModule } from '@spartacus/storefront';
import { ComparisonPanelComponent } from 'projects/fsastorefrontlib/src/lib/cms-lib/checkout/comparison-table/comparison-panel.component';
import { ComparisonTableItemComponent } from './comparison-table/comparison-table-product-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    OutletModule,
    CmsModule
  ],
  declarations: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonPanelComponent, ComparisonTableItemComponent],
  exports: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonPanelComponent,ComparisonTableItemComponent],
  entryComponents: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonPanelComponent,ComparisonTableItemComponent]
})
export class CheckoutModule {
}
