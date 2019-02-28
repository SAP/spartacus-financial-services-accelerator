import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddOptionsPageLayoutComponent} from './add-options-page-layout.component';
import {CheckoutModule} from '../../../checkout';


@NgModule({
  imports: [CommonModule, CheckoutModule],
  declarations: [AddOptionsPageLayoutComponent],
  exports: [AddOptionsPageLayoutComponent],
  providers: [
  ]
})
export class AddOptionsPageLayoutModule { }
