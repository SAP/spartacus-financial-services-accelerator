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
import { map, filter } from 'rxjs/operators';
import { PrefillResolver } from '../../core/resolver/prefill-resolver.interface';
import { FormService } from '../../core/services/form/form.service';

@Component({ template: '' })
export class AbstractFormComponent implements OnInit, OnDestroy {
  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService
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

  protected interDependancyValueCheck() {
    const triggeredControl = this.formService.getFormControlForCode(
      this.config.name,
      this.group
    );
    if (triggeredControl) {
      this.subscription.add(
        triggeredControl.valueChanges
          .pipe(
            filter(_ => !!this.config.validations),
            map(_ => {
              this.config.validations.forEach(validation => {
                if (validation.arguments && validation.arguments.length > 1) {
                  const targetControl = this.formService.getFormControlForCode(
                    validation.arguments[0].value,
                    this.group
                  );
                  targetControl.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false,
                  });
                }
              });
            })
          )
          .subscribe()
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
