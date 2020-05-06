import { ChangeDetectorRef, Component } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';
import { OccMockFormService } from './../../occ/services/occ-mock-form.service';

@Component({
  selector: 'cx-dynamic-select',
  templateUrl: './dynamic-select.component.html',
})
export class DynamicSelectComponent extends AbstractFormComponent {
  options$: Observable<any>;

  constructor(protected formService: OccMockFormService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formsService: FormService) {
    super(formService, formConfig, languageService, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFormControlValuesFromAPI();
  }

  setFormControlValuesFromAPI() {
    if (this.config.apiUrl) {
      if (!this.config.depends) {
        this.subscription.add(
          this.formService
            .getValuesFromAPI(this.config.apiUrl)
            .pipe(
              map(result => {
                if (result.values) {
                  const options = [];
                  result.values.forEach(item => {
                    options.push({
                      name: item.key,
                      label: item.value,
                    });
                  });
                  this.options$ = of(options);
                  this.changeDetectorRef.detectChanges();
                  this.group.get(this.config.name).setValue(null);
                }
              })
            )
            .subscribe()
        );
      } else {
        const masterFormControl = this.formsService.getFormControlForCode(
          this.config.depends,
          this.group
        );
        masterFormControl.valueChanges.subscribe(value => {
          if (value) {
            this.formService
              .getValuesFromAPIForValue(this.config.apiUrl, value)
              .pipe(
                map(result => {
                  if (result.values) {
                    const options = [];
                    result.values.forEach(item => {
                      options.push({
                        name: item.key,
                        label: item.value,
                      });
                    })
                    this.options$ = of(options);
                    this.changeDetectorRef.detectChanges();
                    this.group.get(this.config.name).setValue(null);
                  }
                }
                )
              ).subscribe();
          }
        }
        );
      }
    }
  }
}
