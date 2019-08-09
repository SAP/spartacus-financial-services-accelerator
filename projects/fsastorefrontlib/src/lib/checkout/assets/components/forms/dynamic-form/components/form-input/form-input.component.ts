import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'fsa-form-input',
  templateUrl: './form-input.component.html'
})

export class FormInputComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
}
