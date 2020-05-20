import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { DynamicFormsConfig } from '@fsa/dynamicforms';
import { getCurrencySymbol } from '@angular/common';
import { OccValueListService } from '../../occ/services/occ-value-list.service';

@Component({
  selector: 'cx-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent extends AbstractFormComponent implements OnInit {
  currentCurrency: string;
  currentLocale: string;
  currencySymbol: string;

  constructor(protected currencyService: CurrencyService,
              protected formService: OccValueListService,
              protected formConfig: DynamicFormsConfig,
              protected languageService: LanguageService,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(formService, formConfig, languageService, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscription.add(
      this.activeLang$.subscribe(locale => {
          this.currentLocale = locale;
        },
      ),
    );
    this.subscription.add(
      this.currencyService
        .getActive()
        .pipe(
          map(currentCurrency => {
            this.currentCurrency = currentCurrency;
            this.currencySymbol = getCurrencySymbol(currentCurrency, 'narrow', this.currentLocale);
          }),
        )
        .subscribe(),
    );
  }

}
