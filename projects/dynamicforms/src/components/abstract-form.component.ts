import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { DynamicFormsConfig } from '../core/config/form-config';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit, OnDestroy {
  constructor(
    protected formService: OccMockFormService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService
  ) {}
  label: string;
  cssClass = this.formConfig.dynamicForms.cssClass;
  @HostBinding('class') class = this.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.config) {
              if (this.config.label[lang]) {
                this.label = this.config.label[lang];
              } else if (this.config.label.default) {
                this.label = this.config.label.default;
              }
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
