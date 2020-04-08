import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AbstractFormComponent } from './abstract-form.component';
import { ButtonComponent } from './button/button.component';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { ErrorNoticeComponent } from './error-notice/error-notice.component';
import { FormComponentDirective } from './form-component.directive';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TimeComponent } from './time/time.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [
    FormComponentDirective,
    AbstractFormComponent,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    LabelComponent,
  ],
  entryComponents: [
    AbstractFormComponent,
    ButtonComponent,
    DatePickerComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    LabelComponent,
  ],
  exports: [
    FormComponentDirective,
    AbstractFormComponent,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    LabelComponent,
  ],
})
export class ComponentsModule {}
