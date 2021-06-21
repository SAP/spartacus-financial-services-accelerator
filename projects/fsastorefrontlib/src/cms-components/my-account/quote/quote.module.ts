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

import { QuotesComponent } from './quotes/quotes.component';
import { QuoteService } from '../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { AccordionModule } from 'projects/fsastorefrontlib/src/shared';
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
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyQuotesFlex: {
          component: QuotesComponent,
        },
        AccountQuoteDetailsFlex: {
          component: QuoteDetailsComponent,
        },
      },
    }),
  ],
  declarations: [QuotesComponent, QuoteDetailsComponent],
  exports: [QuotesComponent, QuoteDetailsComponent],
  providers: [QuoteService, QuoteConnector],
  entryComponents: [QuotesComponent],
})
export class QuoteModule {}
