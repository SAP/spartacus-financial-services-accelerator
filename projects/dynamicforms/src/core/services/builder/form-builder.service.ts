import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormDependencyResolverService } from '../form-dependencies/form-dependency-resolver.service';
import { FormValidationService } from '../form-validation/form-validation.service';
import { FieldConfig } from './../../models/form-config.interface';

@Injectable()
export class FormBuilderService {
  constructor(
    protected fb: FormBuilder,
    protected formValidationService: FormValidationService,
    protected formDependencyResolverService: FormDependencyResolverService
  ) {}

  createForm(config) {
    const form = this.fb.group({});
    config.formGroups.forEach(formGroup => {
      const controlGroup =
        formGroup.groupCode !== undefined ? this.fb.group({}) : form;
      if (formGroup.groupCode !== undefined) {
        form.addControl(formGroup.groupCode, controlGroup);
      }

      formGroup.fieldConfigs.forEach(fieldConfig => {
        fieldConfig.group = controlGroup;
        const fieldControl = this.createControl(fieldConfig);
        controlGroup.addControl(fieldConfig.name, fieldControl);
        if (fieldConfig.dependsOn) {
          this.formDependencyResolverService.resolveFormControlDependencies(
            fieldConfig.dependsOn,
            fieldControl,
            form,
            config
          );
        }
        if (formGroup.dependsOn) {
          this.formDependencyResolverService.resolveFormControlDependencies(
            formGroup.dependsOn,
            fieldControl,
            form,
            config
          );
        }
      });
    });
    return form;
  }

  createControl(fieldConfig: FieldConfig) {
    const { disabled, validation, value } = fieldConfig;
    // TODO: Replace attribute 'validation' with 'validations' in form sample configuration
    const validations = validation
      ? validation
      : this.formValidationService.getValidatorsForField(fieldConfig);
    return this.fb.control({ disabled, value }, validations);
  }
}
