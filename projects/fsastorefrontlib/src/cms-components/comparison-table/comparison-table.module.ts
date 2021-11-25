import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgbModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
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
import { SyncPilotGenericModule } from '../sync-pilot/sync-pilot-generic/sync-pilot-generic.module';
import { FSCartService } from '../../core/cart/facade';
import { PricingService } from '../../core/product-pricing/facade';
import { FSProductService } from '../../core/product-pricing/facade/product.service';
import { ComparisonTablePanelItemComponent } from './comaprison-table-panel-item/comparison-table-panel-item.component';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
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
    NgbNavModule,
    NgbTooltipModule,
    UrlModule,
    SyncPilotGenericModule,
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
    NgbModule,
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  exports: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent,
  ],
  providers: [
    FSCartService,
    FSProductService,
    PricingService,
    ComparisonTableService,
  ],
})
export class ComparisonTableModule {}
