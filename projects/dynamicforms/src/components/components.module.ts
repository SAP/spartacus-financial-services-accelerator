import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ErrorNoticeComponent } from './error-notice/error-notice.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TimeComponent } from './time/time.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DatepickerComponent,
    ErrorNoticeComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TextAreaComponent,
    TimeComponent,
    TitleComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
