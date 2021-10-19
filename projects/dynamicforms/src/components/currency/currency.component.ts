import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { FormService } from '../../core/services/form/form.service';

@Component({
  selector: 'cx-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent extends AbstractFormComponent {
  currentCurrency$: Observable<string> = this.currencyService.getActive();

  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService,
    protected currencyService: CurrencyService
  ) {
    super(appConfig, languageService, injector, formService);
  }
}
