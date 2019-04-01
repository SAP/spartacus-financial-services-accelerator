import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '@spartacus/storefront';
import { effects } from './assets/store/effects';
import { AddOptionsModule } from './assets/add-options.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { AccordionModule } from '../accordion/accordion.module';
import { MiniCartModule } from './assets/components/mini-cart/mini-cart.module';
import { FinalReviewComponent } from './assets/components/final-review/final-review.component';

@NgModule({
  imports: [
    CommonModule,
    AddOptionsModule,
    ComponentsModule,
    AccordionModule,
    EffectsModule.forFeature(effects)
  ],
  declarations: [QuoteReviewComponent, FinalReviewComponent],
  exports: [AddOptionsModule, QuoteReviewComponent, MiniCartModule, FinalReviewComponent],
  providers: []
})
export class CheckoutModule {
}
