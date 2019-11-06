import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { FormService } from './services/form.service';
import { FormComponentsModule } from './form-components/form-components.module';
import { FormContainerModule } from './form-containers/form-container.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormComponentsModule,
    FormContainerModule,
  ],
  providers: [FormService, OccMockFormService],
})
export class DynamicFormModule {}
