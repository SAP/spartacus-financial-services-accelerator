import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAccountModule} from '../../../my-account/my-account.module';
import {QuotesPageLayoutComponent} from './quotes-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [QuotesPageLayoutComponent],
  exports: [QuotesPageLayoutComponent]
})
export class QuotesPageLayoutModule {
}
