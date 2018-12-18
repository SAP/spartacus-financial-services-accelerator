import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuotesComponent } from '../assets/components/quotes/quotes.component';
import { QuoteService } from './services/quote.service';
import { QuoteDataService } from './services/quote-data.service';
import { OccQuoteService } from '../../occ/quote/quote.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [QuotesComponent],
  exports: [QuotesComponent],
  providers: [QuoteService, QuoteDataService, OccQuoteService ]

})
export class QuotesModule { }
