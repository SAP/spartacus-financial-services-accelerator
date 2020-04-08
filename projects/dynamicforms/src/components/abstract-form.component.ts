import { Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';

@Component({ template: '' })
export abstract class AbstractFormComponent {
  constructor(
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig
  ) {}
  cssClass = this.formConfig.dynamicForms.cssClass;
  @HostBinding('class') class = this.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;
}
