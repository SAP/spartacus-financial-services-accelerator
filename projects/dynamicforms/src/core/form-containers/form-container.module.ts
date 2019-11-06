import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { FormComponent } from './form/form.component';
import { PricingService } from '../services/pricing/pricing.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponentsModule } from '../form-components/form-components.module';
import { FormService } from '../services/form.service';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OccYformService } from '../../occ/services/form/occ-yform.service';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    ReactiveFormsModule,
    FormComponentsModule,
  ],
  declarations: [FormComponent, DynamicFormComponent],
  exports: [FormComponent, DynamicFormComponent],
  entryComponents: [FormComponent, DynamicFormComponent],
  providers: [PricingService, FormService, OccMockFormService, OccYformService],
})
export class FormContainerModule {}
