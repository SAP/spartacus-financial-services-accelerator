import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { LanguageService } from '@spartacus/core';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit{
  constructor(
    protected formService: OccMockFormService,
    public formConfig: DynamicFormsConfig,
    public language: LanguageService
  ) {}
  label: string;
  currentLanguage: string;
  cssClass = this.formConfig.dynamicForms.cssClass;
  @HostBinding('class') class = this.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;

  ngOnInit() {
    console.log('2');
    this.language.getActive().subscribe( lang => this.currentLanguage = lang);
    if(this.config) {
      if(this.config.label[this.currentLanguage]) {
        this.label = this.config.label[this.currentLanguage];
      } else {
        this.label = this.config.label.default;
      }
    }
   
  }
  
  
 
}
