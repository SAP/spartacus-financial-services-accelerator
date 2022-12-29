import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    I18nModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
  ],
  declarations: [LoanCalculatorComponent],
  exports: [LoanCalculatorComponent],
})
export class LoanCalculatorModule {}
