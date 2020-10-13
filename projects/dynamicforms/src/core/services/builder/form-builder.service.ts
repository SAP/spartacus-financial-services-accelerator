import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormValidationService } from '../form-validation/form-validation.service';
import { FieldConfig } from './../../models/form-config.interface';
import { FieldDependencyResolverService } from './../form-dependencies/field-dependency-resolver.service';

@Injectable()
export class FormBuilderService {
  constructor(
    protected fb: FormBuilder,
    protected formValidationService: FormValidationService,
    protected fieldDependencyResolverService: FieldDependencyResolverService
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
          this.fieldDependencyResolverService.resolveFormControlDependencies(
            fieldConfig,
            fieldControl,
            form
          );
        }
      });
      if (formGroup.dependsOn) {
        this.fieldDependencyResolverService.resolveFormControlDependencies(
          formGroup,
          controlGroup,
          form
        );
      }
    });
    return form;
  }

  createControl(fieldConfig: FieldConfig) {
    const { disabled, value } = fieldConfig;
    const validations = this.formValidationService.getValidatorsForField(
      fieldConfig
    );
    console.log(value);
    return this.fb.control({ disabled, value }, validations);
  }
}
