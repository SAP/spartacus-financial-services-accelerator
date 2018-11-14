import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuotesComponent } from './components/quotes/quotes.component';
import { quoteReducerProvider, quoteReducerToken } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from 'projects/storefrontlib/src/lib/checkout/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { QuoteService } from './services/quote.service';
import { QuoteDataService } from './services/quote-data.service';
import { OccQuoteService } from '../../occ/quote/quote.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    StoreModule.forFeature('quote', quoteReducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [QuotesComponent],
  exports: [QuotesComponent],
  providers: [quoteReducerProvider, QuoteService, QuoteDataService, OccQuoteService ]

})
export class QuotesModule { }
