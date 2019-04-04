import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ComponentsModule } from '@spartacus/storefront';
import { CmsConfig, ConfigModule, AuthGuard } from '@spartacus/core';

import { QuotesComponent } from '../assets/components/quotes/quotes.component';
import { QuoteService } from './services/quote.service';
import { QuoteDataService } from './services/quote-data.service';
import { OccQuoteService } from '../../occ/quote/quote.service';

const routes: Routes = [
  {
    path: 'my-account/my-financial-applications',
    canActivate: [AuthGuard, CmsPageGuard],
    data: { pageLabel: 'my-quotes' },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyQuotesSPAComponent: { selector: 'fsa-quotes' }
      }
    })
  ],
  declarations: [ QuotesComponent ],
  exports: [ QuotesComponent ],
  providers: [ QuoteService, QuoteDataService, OccQuoteService ],
  entryComponents: [ QuotesComponent ]
})
export class QuotesModule { }
