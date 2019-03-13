import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTablePanelComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-panel.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTableItemComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-product-item/comparison-table-product-item.component';
import { ComparisonTableTabComponent } from './comparison-table-container/comparison-table-tab/comparison-table-tab.component';
import { OccBillingTimeService } from '../../occ/billing-time/billing-time.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    CmsModule,
    NgbTabsetModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSMultiComparisonTabContainer: {
          selector: 'fsa-comparison-table-container'
        },
        CMSComparisonTabComponent: { selector: 'fsa-comparison-table-tab' },
        ComparisonPanelCMSComponent: { selector: 'fsa-comparison-table-panel' }
      }
    })
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTableItemComponent
  ],
  exports: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTableItemComponent
  ],
  entryComponents: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTableItemComponent
  ],
  providers: [OccBillingTimeService]
})
export class ComparisonTableModule { }
