import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, FieldOption, LocalizedString } from '../../core/models/form-config.interface';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { LanguageService } from '@spartacus/core';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit, OnDestroy {
  constructor(
    protected formService: OccMockFormService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService
  ) {}

  @HostBinding('class') hostComponentClass: string;
  label: string;
  config: FieldConfig;
  group: FormGroup;
  subscription = new Subscription();
  options: FieldOption[];
  activeLang$: Observable<string>;

  ngOnInit() {
    this.hostComponentClass =
      this.config && this.config.gridClass ? this.config.gridClass : 'col-12';
    if (this.config && this.config.cssClass) {
      this.hostComponentClass = `${this.hostComponentClass} ${this.config.cssClass}`;
    }
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            this.activeLang$  = of(lang);
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
