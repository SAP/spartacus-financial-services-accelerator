import { Component, HostBinding, Input } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent extends AbstractFormComponent {
  @Input() warn: any;
  @Input() parentConfig: any;
  @HostBinding('class') class = '';
  errorMessage: string;

  ngOnInit() {
    this.subscription = this.languageService.getActive().subscribe(lang => {
      if (this.parentConfig && this.parentConfig.error) {
        this.errorMessage = this.parentConfig.error[lang]
          ? this.parentConfig.error[lang]
          : this.parentConfig.error.default;
      }
    });
  }
}
