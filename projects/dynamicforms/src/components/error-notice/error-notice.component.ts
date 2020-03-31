import { Component, Input, HostBinding } from '@angular/core';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent extends GenericComponent {
  @Input() warn: any;
  @Input() parentConfig: any;
  @HostBinding('class') class = '';
}
