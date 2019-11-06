import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { FormComponent } from './form.component';
import { DynamicFormModule } from '../core/dynamic-form.module';
import { PricingService } from '../core/services/pricing/pricing.service';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    DynamicFormModule,
    NgbTooltipModule,
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
  providers: [PricingService],
})
export class FSFormsModule {}
