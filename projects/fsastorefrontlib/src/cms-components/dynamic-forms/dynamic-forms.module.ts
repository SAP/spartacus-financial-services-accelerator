import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule, DynamicFormsConfig } from '@fsa/dynamicforms';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CalculationButtonComponent } from './form-components/calculation-button.component';
import { CartPrefillResolver } from './resolver/cart-prefill-resolver';
import { AutoPersonalDetailsPrefillResolver } from './resolver/auto-personal-details-prefill-resolver';
import { CartEntriesPrefillResolver } from './resolver/cart-entries-prefill-resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    DynamicFormModule,
    ConfigModule.withConfig(<DynamicFormsConfig>{
      dynamicForms: {
        components: {
          calculateButton: {
            component: CalculationButtonComponent,
          },
        },
        prefill: {
          cart: {
            prefillResolver: CartPrefillResolver,
          },
          autoPersonalDetails: {
            prefillResolver: AutoPersonalDetailsPrefillResolver,
          },
          cartEntries: {
            prefillResolver: CartEntriesPrefillResolver,
          },
        },
      },
    }),
  ],
  declarations: [CalculationButtonComponent],
  entryComponents: [CalculationButtonComponent],
  exports: [CalculationButtonComponent],
})
export class FSDynamicformsModule {}
