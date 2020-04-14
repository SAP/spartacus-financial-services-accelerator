import { Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';

@Component({ template: '' })
export class AbstractFormComponent {
  constructor(
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig
  ) {}

  dynamicForms = this.formConfig.dynamicForms;

  @HostBinding('class') class = this.dynamicForms.formClass;
  config: FieldConfig;
  group: FormGroup;
  formComponent = this.dynamicForms.components;
}
