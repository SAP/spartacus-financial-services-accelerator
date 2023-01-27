import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { LanguageService, CurrencyService } from '@spartacus/core';
import {
  AbstractFormComponent,
  DynamicFormsConfig,
  FormService,
} from '@spartacus/dynamicforms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../../../core';
import { OccDynamicNumberInputService } from '../../../../occ/services/dynamic-number-input/occ-dynamic-number-input.service';

export const CATEGORY_CODE = 'categoryCode';

@Component({
  selector: 'cx-fs-dynamic-number-input',
  templateUrl: './dynamic-number-input.component.html',
})
export class DynamicNumberInputComponent extends AbstractFormComponent
  implements OnInit {
  currentCurrency$: Observable<string> = this.currencyService.getActive();
  min: number;
  max: number;
  

  constructor(
    protected occDynamicNumberInputService: OccDynamicNumberInputService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormService,
    protected categoryService: CategoryService,
    protected injector: Injector,
    protected currencyService: CurrencyService
  ) {
    super(formConfig, languageService, injector, formService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.apiValue) {
      this.setFormControlValuesFromAPI();
    }
  }

  configureApiValueForCategory() {
    if (!this.config.apiValue.url.includes(CATEGORY_CODE)) {
      this.subscription.add(
        this.categoryService
          .getActiveCategory()
          .pipe(
            map(activeCategory => {
              if (activeCategory !== '') {
                this.config.apiValue.url += `?${CATEGORY_CODE}=${activeCategory}`;
              }
            })
          )
          .subscribe()
      );
    }
  }

  setFormControlValuesFromAPI() {
      this.configureApiValueForCategory();
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
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }
}
