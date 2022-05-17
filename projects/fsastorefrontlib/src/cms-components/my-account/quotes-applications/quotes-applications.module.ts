import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
} from '@spartacus/core';

// import { QuotesComponent } from './quotes/quotes.component';
// import { QuoteComparisonComponent } from './quote-comparison/quote-comparison.component';
// import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { QuoteService } from '../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { PolicyChartDataService } from '../../../core/my-account/services/policy-chart-data.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextValueModule } from '../../../shared/util/helpers/pipe/context-value/context-value.module';
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
        // AccountQuoteDetailsFlex: {
        //   component: QuoteDetailsComponent,
        // },
        // AccountQuoteComparisonFlex: {
        //   component: QuoteComparisonComponent,
        // },
      },
    }),
  ],
  declarations: [QuotesApplicationsComponent],
  exports: [QuotesApplicationsComponent],
  providers: [QuoteService, QuoteConnector, PolicyChartDataService],
})
export class QuotesApplicationsModule {}
