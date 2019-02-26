import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsModule, ComponentsModule, OutletModule } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';
import { ComparisonTablePanelComponent } from './comparison-table-panel.component';
import { ComparisonTableItemComponent } from './comparison-table-product-item.component';
import { ComparisonTableTabComponent } from './comparison-table-tab.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        OutletModule,
        CmsModule
    ],
    declarations: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent, ComparisonTableItemComponent],
    exports: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent, ComparisonTableItemComponent],
    entryComponents: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent, ComparisonTableItemComponent]
})
export class ComparisonTableModule {
}
