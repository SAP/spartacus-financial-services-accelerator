import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit {
  constructor(
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig
  ) {}

  @HostBinding('class') hostComponentClass;
  config: FieldConfig;
  group: FormGroup;
  formComponent;

  ngOnInit() {
    if (
      this.config &&
      this.config.type &&
      this.formConfig &&
      this.formConfig.dynamicForms &&
      this.formConfig.dynamicForms.components &&
      this.formConfig.dynamicForms.components[this.config.type] &&
      this.formConfig.dynamicForms.components[this.config.type].cssEntries
    ) {
      const component = this.formConfig.dynamicForms.components;
      this.hostComponentClass = component[this.config.type].cssEntries
        .controlContainerClass
        ? component[this.config.type].cssEntries.controlContainerClass
        : '';
      this.formComponent = component[this.config.type].cssEntries;
    }
  }
}
