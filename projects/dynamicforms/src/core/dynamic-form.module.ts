import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { ErrorNoticeComponent } from './components/error-notice/error-notice.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormDatePickerComponent } from './components/form-datepicker/form-datepicker.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormTextAreaComponent } from './components/form-text-area/form-text-area.component';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { FormService } from './services/form.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormTitleComponent,
    FormDatePickerComponent,
    ErrorNoticeComponent,
    FormTextAreaComponent,
  ],
  exports: [DynamicFormComponent],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormTitleComponent,
    FormDatePickerComponent,
    FormTextAreaComponent,
  ],
  providers: [FormService, OccMockFormService],
})
export class DynamicFormModule {}
