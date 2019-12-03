import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/form-config.interface';

export class FormGenericComponent {
  config: FieldConfig;
  group: FormGroup;
}
