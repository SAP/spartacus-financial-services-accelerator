import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent extends AbstractFormComponent
  implements OnInit {
  @Input() warn: any;
  @Input() parentConfig: any;
  @HostBinding('class') class = '';
  errorMessage: string;
  ngOnInit() {
    super.ngOnInit();
    this.language.getActive().subscribe(lang => {
      if (this.parentConfig.error) {
        if (this.parentConfig.error[lang]) {
          this.errorMessage = this.parentConfig.error[lang];
        } else {
          this.errorMessage = this.parentConfig.error.default;
        }
      }
    });
  }
}
