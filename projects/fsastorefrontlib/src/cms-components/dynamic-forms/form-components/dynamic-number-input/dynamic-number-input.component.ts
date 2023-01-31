import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LanguageService, CurrencyService } from '@spartacus/core';
import {
  AbstractFormComponent,
  DynamicFormsConfig,
  FormService,
} from '@spartacus/dynamicforms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccDynamicNumberInputService } from '../../../../occ/services/dynamic-number-input/occ-dynamic-number-input.service';
import { DynamicFormsCategoryService } from '../../services/dynamic-forms-category.service';

@Component({
  selector: 'cx-fs-dynamic-number-input',
  templateUrl: './dynamic-number-input.component.html',
})
export class DynamicNumberInputComponent extends AbstractFormComponent
  implements OnInit, OnDestroy {
  currentCurrency$: Observable<string> = this.currencyService.getActive();
  min: number;
  max: number;

  constructor(
    protected occDynamicNumberInputService: OccDynamicNumberInputService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormService,
    protected injector: Injector,
    protected currencyService: CurrencyService,
    protected dynamicFormsCategoryService: DynamicFormsCategoryService
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
    this.dynamicFormsCategoryService.configureApiValueForCategory(this.config);
    this.subscription.add(
      this.occDynamicNumberInputService
        .getValuesFromAPI(this.config.apiValue.url)
        .pipe(
          map(result => {
            this.assignResultToMinMax(result);
          })
        )
        .subscribe()
    );
  }

  assignResultToMinMax(result: any) {
    if (result) {
      this.min = result.min;
      this.max = result.max;
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
