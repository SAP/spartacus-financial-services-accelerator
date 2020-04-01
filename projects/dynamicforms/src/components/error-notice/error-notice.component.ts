import { Component, Input, HostBinding } from '@angular/core';
import { CommonComponentConfig } from '../common-component-config';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent extends CommonComponentConfig {
  @Input() warn: any;
  @Input() parentConfig: any;
  @HostBinding('class') class = '';
}
