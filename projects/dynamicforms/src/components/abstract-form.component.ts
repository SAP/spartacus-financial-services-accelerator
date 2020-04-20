import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { LanguageService } from '@spartacus/core';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit {
  constructor(
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig,
    public language: LanguageService
  ) {}
  label: string;
  cssClass = this.formConfig.dynamicForms.cssClass;
  @HostBinding('class') class = this.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;

  ngOnInit() {
    this.language.getActive().subscribe(lang => {
      if (this.config) {
        if (this.config.label[lang]) {
          this.label = this.config.label[lang];
        } else if (this.config.label.default) {
          this.label = this.config.label.default;
        } else {
          this.label = '';
        }
      }
    });
  }
}
