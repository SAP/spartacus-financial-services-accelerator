import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'fsa-form-title',
  templateUrl: './form-title.component.html'
})

export class FormTitleComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
}
