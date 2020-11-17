import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AbstractFormComponent } from './abstract-form/abstract-form.component';
import { ButtonComponent } from './button/button.component';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { ErrorNoticeComponent } from './error-notice/error-notice.component';
import { FormComponentDirective } from './form-component.directive';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TimeComponent } from './time/time.component';
import { TitleComponent } from './title/title.component';
import { SeparatorComponent } from './separator/separator.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AbstractOptionsComponent } from './abstract-options/abstract-options.component';
import { FormPopupErrorComponent } from './form-popup-error/form-popup-error.component';
import { DataHolderComponent } from './data-holder/data-holder.component';
import { FormComponentService } from './form-component.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [
    FormComponentDirective,
    AbstractFormComponent,
    AbstractOptionsComponent,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    DataHolderComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    SeparatorComponent,
    CheckboxComponent,
    FormPopupErrorComponent,
  ],
  entryComponents: [
    AbstractFormComponent,
    AbstractOptionsComponent,
    ButtonComponent,
    DatePickerComponent,
    DataHolderComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    SeparatorComponent,
    CheckboxComponent,
  ],
  exports: [
    FormComponentDirective,
    AbstractFormComponent,
    AbstractOptionsComponent,
    ButtonComponent,
    DatePickerComponent,
    ErrorNoticeComponent,
    DataHolderComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
    SeparatorComponent,
    CheckboxComponent,
    FormPopupErrorComponent,
  ],
  providers: [FormComponentService],
})
export class ComponentsModule {}
