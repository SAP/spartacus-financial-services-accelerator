import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule, I18nModule } from '@spartacus/core';
import { FSMiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlTranslationModule
  ],
  declarations: [FSMiniCartComponent],
  entryComponents: [FSMiniCartComponent],
  exports: [FSMiniCartComponent],
  providers: []
})
export class MiniCartModule {}
