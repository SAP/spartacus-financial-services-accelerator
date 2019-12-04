import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.interface';
import { FormConfig } from '../models/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FormGenericComponent {
  constructor(
    protected formConfig: FormConfig,
    protected formService: OccMockFormService
  ) {}
  config: FieldConfig;
  group: FormGroup;
}
