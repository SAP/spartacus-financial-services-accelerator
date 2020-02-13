import { Injectable, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/form-config.interface';
import { FormConfig } from '../models/form-config';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';

@Injectable()
export class FormGenericComponent {
  constructor(
    protected formService: OccMockFormService,
    public formConfig: FormConfig
  ) {}
  @HostBinding('class') class = this.formConfig.cssClass.controlElement;
  config: FieldConfig;
  group: FormGroup;
}
