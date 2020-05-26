import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule, DynamicFormsConfig } from '@fsa/dynamicforms';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CalculationButtonComponent } from './calculation-button.component';

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
      },
    }),
  ],
  declarations: [CalculationButtonComponent],
  entryComponents: [CalculationButtonComponent],
  exports: [CalculationButtonComponent],
})
export class FormComponentsModule {}
