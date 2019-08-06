import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { SpinnerModule } from '@spartacus/storefront';
import { AuthGuard, I18nModule, ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';

import { QuotesComponent } from '../assets/components/quotes/quotes.component';
import { QuoteService } from './services/quote.service';
import { QuoteDataService } from './services/quote-data.service';
import { OccQuoteService } from '../../occ/quote/quote.service';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'quotes',
      pageLabel: 'my-quotes'
    },
    component: PageLayoutComponent
  }
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
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        AccountMyQuotesSPAComponent: {
          component: QuotesComponent
        }
      }
    })
  ],
  declarations: [ QuotesComponent ],
  exports: [ QuotesComponent ],
  providers: [ QuoteService, QuoteDataService, OccQuoteService ],
  entryComponents: [ QuotesComponent ]
})
export class QuotesModule { }
