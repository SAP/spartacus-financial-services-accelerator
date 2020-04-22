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
  @HostBinding('class') hostComponentClass;
  formComponent;
  // cssClass = this.formConfig.dynamicForms.cssClass;
  // @HostBinding('class') class = this.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;
  subscription = new Subscription();

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
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.config && this.config.label) {
              this.label = this.config.label[lang]
                ? this.config.label[lang]
                : this.config.label.default;
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
