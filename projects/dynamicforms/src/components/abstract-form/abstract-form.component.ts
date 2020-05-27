import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../core/models/form-config.interface';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrefillResolver } from '../../core/resolver/prefill-resolver.interface';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit, OnDestroy {
  constructor(
    protected occValueListService: OccValueListService,
    protected AppConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected injector: Injector
  ) {}

  @HostBinding('class') hostComponentClass: string;
  label: string;
  config: FieldConfig;
  group: FormGroup;
  subscription = new Subscription();
  activeLang$ = this.languageService.getActive();

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
            if (this.config && this.config.label) {
              this.label = this.config.label[lang]
                ? this.config.label[lang]
                : this.config.label.default;
            }
          })
        )
        .subscribe()
    );
    if (this.config.prefillValue) {
      const prefillResolver = this.injector.get<PrefillResolver>(
        this.AppConfig.dynamicForms.prefill[
          this.config.prefillValue.targetObject
        ].prefillResolver
      );
      if (prefillResolver) {
        prefillResolver
          .getFieldValue(this.config.prefillValue.targetValue)
          .subscribe(value => {
            if (value) {
              this.group.get(this.config.name).setValue(value);
            }
          })
          .unsubscribe();
      }
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
