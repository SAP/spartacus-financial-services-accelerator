import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'fsa-form-select',
  templateUrl: './form-select.component.html'

})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
