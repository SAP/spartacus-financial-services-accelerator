import { Component, Injector } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { FormDateConfig } from '../../core/config/date-config/date-config';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FormService } from '../../core/services/form/form.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';

@Component({
  selector: 'cx-datepicker',
  templateUrl: './datepicker.component.html',
})
export class DatePickerComponent extends AbstractFormComponent {
  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService,
    protected dateConfig: FormDateConfig
  ) {
    super(appConfig, languageService, injector, formService);
  }

  getDateFormat() {
    return this.dateConfig?.date?.format || '';
  }
}
