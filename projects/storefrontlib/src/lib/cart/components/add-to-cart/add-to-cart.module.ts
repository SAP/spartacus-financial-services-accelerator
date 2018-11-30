import { NgModule } from '@angular/core';

import { CartSharedModule } from './../cart-shared/cart-shared.module';
import { SpinnerModule } from './../../../ui/components/spinner/spinner.module';

import { AddToCartComponent } from './add-to-cart.component';

import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@NgModule({
  imports: [CartSharedModule, SpinnerModule],
  declarations: [AddToCartComponent, AddedToCartDialogComponent],
  entryComponents: [AddedToCartDialogComponent],
  exports: [AddToCartComponent]
})
export class AddToCartModule {}
