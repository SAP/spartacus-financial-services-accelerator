import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ComponentsModule} from '@spartacus/storefront';
import {ComparisonTableComponent} from './comparison-table/comparison-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  declarations: [ComparisonTableComponent],
  exports: [ComparisonTableComponent],
  entryComponents: [ComparisonTableComponent]
})
export class CheckoutModule {
}
