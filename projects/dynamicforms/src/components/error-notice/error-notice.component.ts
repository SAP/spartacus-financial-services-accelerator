import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';
import { map } from 'rxjs/operators';

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

    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.parentConfig.error) {
              if (this.parentConfig.error[lang]) {
                this.errorMessage = this.parentConfig.error[lang];
              } else if (this.parentConfig.error.default) {
                this.errorMessage = this.parentConfig.error.default;
              }
            }
          })
        )
        .subscribe()
    );
  }
}
