import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '@spartacus/storefront';
import { effects } from './assets/store/effects';
import { AddOptionsModule } from './assets/add-options.module';
import { QuoteReviewComponent } from './assets/components/quote-review/quote-review.component';
import { AccordionModule } from '../accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    AddOptionsModule,
    ComponentsModule,
    AccordionModule,
    EffectsModule.forFeature(effects)
  ],
  declarations: [QuoteReviewComponent],
  exports: [AddOptionsModule, QuoteReviewComponent],
  providers: []
})
export class CheckoutModule {
}
