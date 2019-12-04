import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, ConfigModule } from '@spartacus/core';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { FormErrorNoticeComponent } from './form-error-notice/form-error-notice.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormDatePickerComponent } from './form-datepicker/form-datepicker.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTitleComponent } from './form-title/form-title.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormTextAreaComponent } from './form-text-area/form-text-area.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule
  ],

  declarations: [
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormTitleComponent,
    FormDatePickerComponent,
    FormErrorNoticeComponent,
    FormTextAreaComponent,
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormTitleComponent,
    FormDatePickerComponent,
    FormTextAreaComponent,
  ],
  exports: [
    DynamicFieldDirective,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormTitleComponent,
    FormDatePickerComponent,
    FormErrorNoticeComponent,
    FormTextAreaComponent,
  ],
})
export class FormComponentsModule {}
