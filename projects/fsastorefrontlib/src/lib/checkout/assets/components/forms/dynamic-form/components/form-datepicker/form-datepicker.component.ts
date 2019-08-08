import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'fsa-form-datepicker',
  templateUrl: './form-datepicker.component.html'
})

export class FormDatePickerComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
}
