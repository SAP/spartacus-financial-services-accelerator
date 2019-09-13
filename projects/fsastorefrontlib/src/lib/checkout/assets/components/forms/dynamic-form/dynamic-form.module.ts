import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { FormDatePickerComponent } from './components/form-datepicker/form-datepicker.component';
import { OccMockFormService } from '../../../../../occ/form/occ-mock-form.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTitleComponent,
    FormDatePickerComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTitleComponent,
    FormDatePickerComponent
  ],
  providers: [OccMockFormService]
})
export class DynamicFormModule {}
