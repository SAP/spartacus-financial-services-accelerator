import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ComponentsModule } from '../../components/components.module';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormBuilderService } from '../services/builder/form-builder.service';
import { FormDataService } from '../services/data/form-data.service';
import { FormValidationService } from '../services/form-validation/form-validation.service';
import { FormDependencyResolverService } from './../services/form-dependencies/form-dependency-resolver.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form.component';
import { FormConnector } from '../connectors/form-connector';
import { OccFormAdapter } from '../../occ/adapters/form/occ-form.adapter';
import { FormAdapter } from '../connectors/form.adapter';

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
    FormConnector,
    FormDataService,
    {
      provide: FormAdapter,
      useClass: OccFormAdapter,
    },
  ],
})
export class FormContainerModule {}
