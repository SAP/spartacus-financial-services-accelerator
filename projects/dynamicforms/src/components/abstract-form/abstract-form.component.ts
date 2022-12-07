import {
  Component,
  HostBinding,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { PrefillResolver } from '../../core/resolvers/prefill-resolver.interface';
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
  placeHolder: string;
  config: FieldConfig;
  group: UntypedFormGroup;
  subscription = new Subscription();
  activeLang$ = this.languageService.getActive();

  ngOnInit() {
    this.setHostComponentClass();
    this.setLocalizedProperties();
    this.controlPrefill();
    this.interDependancyValueCheck();
  }

  protected setHostComponentClass() {
    this.hostComponentClass =
      this.config && this.config.gridClass ? this.config.gridClass : 'col-12';
    if (this.config && this.config.cssClass) {
      this.hostComponentClass = `${this.hostComponentClass} ${this.config.cssClass}`;
    }
  }

  protected setLocalizedProperties() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.config?.label) {
              this.label = this.config.label[lang]
                ? this.config.label[lang]
                : this.config.label.default;
            }
            if (this.config?.placeholder) {
              this.placeHolder = this.config.placeholder[lang]
                ? this.config.placeholder[lang]
                : this.config.placeholder.default;
            }
          })
        )
        .subscribe()
    );
  }

  protected controlPrefill() {
    if (this.config.prefillValue) {
      const targetObject = this.appConfig.dynamicForms.prefill[
        this.config.prefillValue.targetObject
      ];
      if (targetObject && targetObject.prefillResolver) {
        const prefillResolver = this.injector.get<PrefillResolver>(
          targetObject.prefillResolver
        );
        this.subscription.add(
          prefillResolver
            .getPrefillValue(this.config.prefillValue.targetValue)
            .subscribe(value => {
              if (value) {
                this.group.get(this.config.name).setValue(value);
              }
            })
        );
      }
    }
  }

  protected interDependancyValueCheck() {
    const triggeredControl = this.formService.getFormControlForCode(
      this.config.name,
      this.group.root
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
                    this.group.root
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
