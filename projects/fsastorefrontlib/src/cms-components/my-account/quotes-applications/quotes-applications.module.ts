import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import {
  CmsPageGuard,
  MediaModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { SpinnerModule } from '@spartacus/storefront';
import {
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
  TranslatePipe,
} from '@spartacus/core';

import { QuotesApplicationsComparisonComponent } from './quotes-applications-comparison/quotes-applications-comparison.component';
import { QuoteService } from '../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { PolicyChartDataService } from '../../../core/my-account/services/policy-chart-data.service';
import { ContextValueModule } from '../../../shared/util/helpers/pipe/context-value/context-value.module';
import { QuotesApplicationsDetailsComponent } from './quotes-applications-details/quotes-applications-details.component';
import { QuotesApplicationsComponent } from './quotes-applications/quotes-applications.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quotes',
      pageLabel: 'my-quotes',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quoteDetails',
      pageLabel: 'quote-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quoteComparison',
      pageLabel: 'quote-comparison',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    MediaModule,
    UrlModule,
    AccordionModule,
    NgbTooltipModule,
    ContextValueModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyQuotesFlex: {
          component: QuotesApplicationsComponent,
        },
        AccountQuoteDetailsFlex: {
          component: QuotesApplicationsDetailsComponent,
        },
        AccountQuoteComparisonFlex: {
          component: QuotesApplicationsComparisonComponent,
        },
      },
    }),
  ],
  declarations: [
    QuotesApplicationsComponent,
    QuotesApplicationsDetailsComponent,
    QuotesApplicationsComparisonComponent,
  ],
  exports: [
    QuotesApplicationsComponent,
    QuotesApplicationsDetailsComponent,
    QuotesApplicationsComparisonComponent,
  ],
  providers: [
    QuoteService,
    QuoteConnector,
    PolicyChartDataService,
    TranslatePipe,
  ],
})
export class QuotesApplicationsModule {}
