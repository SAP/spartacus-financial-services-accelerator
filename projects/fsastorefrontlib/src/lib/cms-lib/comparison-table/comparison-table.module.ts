import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';
import { ComparisonTablePanelComponent } from './comparison-table-panel.component';
import { ComparisonTableItemComponent } from './comparison-table-product-item.component';
import { ComparisonTableTabComponent } from './comparison-table-tab.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        CmsModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                CMSMultiComparisonTabContainer: { selector: 'fsa-comparison-table-container' },
                CMSComparisonTabComponent: { selector: 'fsa-comparison-table-tab' },
                ComparisonPanelCMSComponent: { selector: 'fsa-comparison-table-panel' }
            }
        }),
    ],
    declarations: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent
        , ComparisonTableItemComponent],
    exports: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent
        , ComparisonTableItemComponent],
    entryComponents: [ComparisonTableContainerComponent, ComparisonTableTabComponent, ComparisonTablePanelComponent
        , ComparisonTableItemComponent]
})
export class ComparisonTableModule {
}
