import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, ConfigModule, Config } from '@spartacus/core';
import { ButtonComponent } from './button/button.component';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { ErrorNoticeComponent } from './error-notice/error-notice.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TimeComponent } from './time/time.component';
import { TitleComponent } from './title/title.component';
import { defaultFormConfig } from '../core/config/default-form-config';
import { FormComponentDirective } from './form-component.directive';
import { FormConfig } from '../core/config/form-config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    ConfigModule.withConfig(defaultFormConfig),
  ],
  declarations: [
    FormComponentDirective,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
  ],
  entryComponents: [
    ButtonComponent,
    DatePickerComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
  ],
  exports: [
    FormComponentDirective,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
  ],
  providers: [{ provide: FormConfig, useExisting: Config }],
})
export class ComponentsModule {}
