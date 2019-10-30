import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { FSCartService } from '../../lib/checkout/assets/services';
import { PricingService } from '../../lib/checkout/assets/services/pricing/pricing.service';
import { FSProductService } from '../../lib/checkout/assets/services/product/fs-product.service';
import { OccBillingTimeService } from '../../lib/occ/billing-time/billing-time.service';
import { OccProductService } from '../../lib/occ/pricing/occ-product.service';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
import { ComparisonTablePanelItemComponent } from './comaprison-table-panel-item/comparison-table-panel-item.component';
import { ComparisonTablePanelComponent } from './comparison-table-panel/comparison-table-panel.component';
import { ComparisonTableTabComponent } from './comparison-table-tab/comparison-table-tab.component';
import { ComparisonTableService } from './comparison-table.service';

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    NgbTabsetModule,
    NgbTooltipModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        CMSMultiComparisonTabContainer: {
          component: ComparisonTableContainerComponent,
        },
        CMSComparisonTabComponent: {
          component: ComparisonTableTabComponent,
        },
        ComparisonPanelCMSComponent: {
          component: ComparisonTablePanelComponent,
        },
      },
    }),
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  entryComponents: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  providers: [
    OccBillingTimeService,
    OccProductService,
    ComparisonTableService,
    FSCartService,
    PricingService,
    FSProductService,
  ],
})
export class ComparisonTableModule {}
