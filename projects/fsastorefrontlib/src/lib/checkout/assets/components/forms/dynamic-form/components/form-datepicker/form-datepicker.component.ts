import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-datepicker',
  templateUrl: './form-datepicker.component.html'
})

export class FormDatepickerComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
}
