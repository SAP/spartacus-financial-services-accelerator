import { Component, Input, HostBinding } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent extends AbstractFormComponent {
  @Input() warn: any;
  @Input() parentConfig: any;
  @HostBinding('class') class = '';
}
