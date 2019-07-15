import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsModule, CmsConfig, ConfigModule, UrlModule, I18nModule, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { SpinnerModule, PageComponentModule, CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ComparisonTableContainerComponent } from './comparison-table-container/comparison-table-container.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTablePanelComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-panel.component';
// tslint:disable-next-line:max-line-length
import { ComparisonTablePanelItemComponent } from './comparison-table-container/comparison-table-tab/comparison-table-panel/comparison-table-panel-item/comparison-table-panel-item.component';
import { ComparisonTableTabComponent } from './comparison-table-container/comparison-table-tab/comparison-table-tab.component';
import { OccBillingTimeService } from '../../occ/billing-time/billing-time.service';
import { ComparisonTableService } from './comparison-table.service';
import { FSCartService } from '../../checkout/assets/services';
import { PricingService } from '../../occ/pricing/pricing.service';


// const routes: Routes = [
//   {
//     path: 'category/:categoryCode',
//     canActivate: [ CmsPageGuard ],
//     data: {
//       cxRoute: 'comparisonTable'
//     },
//     component: PageLayoutComponent
//   }
// ];

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
    // RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        CMSMultiComparisonTabContainer: {
          component: ComparisonTableContainerComponent
        },
        CMSComparisonTabComponent: {
          component: ComparisonTableTabComponent
        },
        ComparisonPanelCMSComponent: {
          component: ComparisonTablePanelComponent
        }
      }
    })
  ],
  declarations: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent
  ],
  entryComponents: [
    ComparisonTableContainerComponent,
    ComparisonTableTabComponent,
    ComparisonTablePanelComponent,
    ComparisonTablePanelItemComponent
  ],
  providers: [OccBillingTimeService, ComparisonTableService, FSCartService, PricingService]
})
export class ComparisonTableModule { }
