import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.interface';
import { FormConfig } from '../models/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';

@Injectable()
export class FormGenericComponent {
  constructor(
    public formConfig: FormConfig,
    protected formService: OccMockFormService
  ) {}
  config: FieldConfig;
  group: FormGroup;
}
