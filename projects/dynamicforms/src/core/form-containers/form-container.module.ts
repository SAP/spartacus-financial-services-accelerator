import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ComponentsModule } from '../../components/components.module';
import { OccFormService } from '../../occ/services/form/occ-form.service';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormBuilderService } from '../services/builder/form-builder.service';
import { FormDataService } from '../services/data/form-data.service';
import { FormValidationService } from '../services/form-validation/form-validation.service';
import { FormDependencyResolverService } from './../services/form-dependencies/form-dependency-resolver.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [FormComponent, DynamicFormComponent],
  exports: [FormComponent, DynamicFormComponent, ComponentsModule],
  entryComponents: [FormComponent, DynamicFormComponent],
  providers: [
    FormBuilderService,
    FormValidationService,
    FormDependencyResolverService,
    OccMockFormService,
    OccFormService,
    FormDataService,
  ],
})
export class FormContainerModule {}
