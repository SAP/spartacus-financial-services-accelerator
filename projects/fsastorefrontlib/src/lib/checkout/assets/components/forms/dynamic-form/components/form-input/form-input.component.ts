import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  templateUrl: './form-input.component.html'
})

export class FormInputComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
}
