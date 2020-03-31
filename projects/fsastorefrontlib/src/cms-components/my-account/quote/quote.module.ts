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
import { QuoteService } from '../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../core/my-account/connectors/quote.connector';
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
        AccountMyQuotesFlex: {
          component: QuotesComponent,
        },
      },
    }),
  ],
  declarations: [QuotesComponent],
  exports: [QuotesComponent],
  providers: [QuoteService, QuoteConnector],
  entryComponents: [QuotesComponent],
})
export class QuoteModule {}
