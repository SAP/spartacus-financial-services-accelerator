import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';
import { FieldConfig } from './../../core/models/form-config.interface';

@Component({
  selector: 'cx-label',
  templateUrl: './label.component.html',
})
export class LabelComponent extends AbstractFormComponent {
  @Input() config: FieldConfig;
  @Input() cssLabelClass: string;
}
