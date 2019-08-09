import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.interface';

export class FormGenericComponent {
  config: FieldConfig;
  group: FormGroup;
}
