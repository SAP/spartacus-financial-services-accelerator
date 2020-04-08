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
  @HostBinding('class') class = this.formConfig.dynamicForms.cssClass
    .controlElement;
  config: FieldConfig;
  group: FormGroup;
}
