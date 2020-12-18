import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import {
  AbstractFormComponent,
  DynamicFormsConfig,
  FormService,
} from '@spartacus/dynamicforms';
import { LanguageService } from '@spartacus/core';
import { OccValueListService } from '../../../../occ/services/value-list/occ-value-list.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-dynamic-select',
  templateUrl: './dynamic-select.component.html',
})
export class DynamicSelectComponent extends AbstractFormComponent
  implements OnInit {
  options$: Observable<any>;

  constructor(
    protected occValueListService: OccValueListService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormService,
    protected injector: Injector
  ) {
    super(formConfig, languageService, injector, formService);
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
        this.occValueListService
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
                return this.occValueListService
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
