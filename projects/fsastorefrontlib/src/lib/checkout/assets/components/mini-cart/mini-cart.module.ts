import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule } from '@spartacus/core';
import { FSMiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlTranslationModule,
  ],
  declarations: [FSMiniCartComponent],
  entryComponents: [FSMiniCartComponent],
  exports: [FSMiniCartComponent],
  providers: []
})
export class MiniCartModule {}
