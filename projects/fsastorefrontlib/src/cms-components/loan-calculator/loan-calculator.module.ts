import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { LoanCalculatorComponent } from './loan-calculator.component';

@NgModule({
  imports: [I18nModule],
  declarations: [LoanCalculatorComponent],
  exports: [LoanCalculatorComponent],
})

export class LoanCalculatorModule {}
