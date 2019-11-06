import { Component, Input } from '@angular/core';
import { FormGenericComponent } from '../form-generic.component';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './form-error-notice.component.html',
})
export class FormErrorNoticeComponent extends FormGenericComponent {
  @Input() warn: any;
  @Input() parentConfig: any;
}
