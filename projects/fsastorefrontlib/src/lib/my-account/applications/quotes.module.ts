import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuotesComponent } from './components/quotes/quotes.component';
import { reducerProvider } from './store/reducers';
import { QuotesService } from './services/quotes.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [QuotesComponent],
  exports: [QuotesComponent],
  providers: [reducerProvider, QuotesService]

})
export class QuotesModule { }
