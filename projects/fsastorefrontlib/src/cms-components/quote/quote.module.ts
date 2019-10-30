import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { SpinnerModule } from '@spartacus/storefront';
import {
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';

import { QuotesComponent } from './quotes/quotes.component';
import { QuoteService } from '../../core/myaccount/services/quote.service';
import { QuoteDataService } from '../../core/myaccount/services/quote-data.service';
import { OccQuoteService } from '../../occ/services/quote/quote.service';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';

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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyQuotesSPAComponent: {
          component: QuotesComponent,
        },
        CMSViewQuotesComponent: {
          component: CMSViewQuotesComponent,
        },
      },
    }),
  ],
  declarations: [QuotesComponent, CMSViewQuotesComponent],
  exports: [QuotesComponent, CMSViewQuotesComponent],
  providers: [QuoteService, QuoteDataService, OccQuoteService],
  entryComponents: [QuotesComponent, CMSViewQuotesComponent],
})
export class QuoteModule {}
