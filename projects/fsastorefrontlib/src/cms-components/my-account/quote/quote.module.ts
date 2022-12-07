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
  TranslatePipe,
} from '@spartacus/core';

import { QuotesComponent } from './quotes/quotes.component';
import { QuoteService } from '../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { QuoteComparisonComponent } from './quote-comparison/quote-comparison.component';
import { PolicyChartDataService } from '../../../core/my-account/services/policy-chart-data.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BillingEventValuePipe } from './../../../shared/util/helpers/pipe/billing-event-value.pipe';
import { BankingEntryValuePipe } from '../../../shared/util/helpers/pipe/banking-entry-value.pipe';

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
        RouterModule.forChild(routes),
        ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
            cmsComponents: {
                AccountMyQuotesFlex: {
                    component: QuotesComponent,
                },
                AccountQuoteDetailsFlex: {
                    component: QuoteDetailsComponent,
                },
                AccountQuoteComparisonFlex: {
                    component: QuoteComparisonComponent,
                },
            },
        }),
    ],
    declarations: [
        QuotesComponent,
        QuoteDetailsComponent,
        QuoteComparisonComponent,
        BillingEventValuePipe,
        BankingEntryValuePipe,
    ],
    exports: [QuotesComponent, QuoteDetailsComponent, QuoteComparisonComponent],
    providers: [
        QuoteService,
        QuoteConnector,
        PolicyChartDataService,
        TranslatePipe,
    ]
})
export class QuoteModule {}
