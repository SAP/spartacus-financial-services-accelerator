import { ChangeDetectorRef, Component } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { OccFormService } from '../../occ/services/occ-form.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';

@Component({
  selector: 'cx-dynamic-select',
  templateUrl: './dynamic-select.component.html',
})
export class DynamicSelectComponent extends AbstractFormComponent {
  options$: Observable<any>;

  constructor(
    protected occFormService: OccFormService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormService
  ) {
    super(occFormService, formConfig, languageService, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.apiValue) {
      this.setFormControlValuesFromAPI();
    }
  }

  setFormControlValuesFromAPI() {
    if (!this.config.apiValue.param) {
      this.subscription.add(
        this.occFormService
          .getValuesFromAPI(this.config.apiValue.url)
          .pipe(map(result => this.assignResultToOptions(result)))
          .subscribe()
      );
    } else {
      const masterFormControl = this.formService.getFormControlForCode(
        this.config.apiValue.param,
        this.group
      );
      this.subscription.add(
        masterFormControl.valueChanges
          .pipe(
            switchMap(value => {
              if (value) {
                return this.occFormService
                  .getValuesFromAPI(this.config.apiValue.url, value)
                  .pipe(map(result => this.assignResultToOptions(result)));
              } else {
                this.assignOptions([]);
                return of(null);
              }
            })
          )
          .subscribe()
      );
    }
  }

  assignResultToOptions(result: any) {
    if (result.values) {
      const options = [];
      result.values.forEach(item => {
        options.push({
          name: item.key,
          label: item.value,
        });
      });
      this.assignOptions(options);
    }
  }

  assignOptions(options: any[]) {
    this.options$ = of(options);
    this.changeDetectorRef.detectChanges();
    this.group.get(this.config.name).setValue(null);
  }
}
