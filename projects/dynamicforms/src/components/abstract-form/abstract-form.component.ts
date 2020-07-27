import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Injector,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../core/models/form-config.interface';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PrefillResolver } from '../../core/resolver/prefill-resolver.interface';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit, OnDestroy {
  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
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

    this.interDependancyValueCheck();

    if (this.config.prefillValue) {
      const targetObject = this.appConfig.dynamicForms.prefill[
        this.config.prefillValue.targetObject
      ];
      if (targetObject && targetObject.prefillResolver) {
        const prefillResolver = this.injector.get<PrefillResolver>(
          targetObject.prefillResolver
        );
        prefillResolver
          .getPrefillValue(this.config.prefillValue.targetValue)
          .subscribe(value => {
            if (value) {
              this.group.get(this.config.name).setValue(value);
            }
          })
          .unsubscribe();
      }
    }
  }

  interDependancyValueCheck() {
    if (this.group.get(this.config.name)) {
      this.subscription.add(
        this.group.get(this.config.name).valueChanges.subscribe(_ => {
          if (this.config.validations) {
            this.config.validations.forEach(validation => {
              if (validation.arguments && validation.arguments.length > 1) {
                this.group
                  .get(validation.arguments[0].value)
                  .updateValueAndValidity({ onlySelf: true, emitEvent: false });
              }
            });
          }
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
