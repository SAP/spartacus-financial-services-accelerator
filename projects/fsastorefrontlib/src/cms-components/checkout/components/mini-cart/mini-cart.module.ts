import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { MiniCartComponent } from './mini-cart.component';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, SpinnerModule],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
  exports: [MiniCartComponent],
  providers: [],
})
export class MiniCartModule {}
