import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LanguageService } from '@spartacus/core';

@Component({
  selector: 'cx-error-notice',
  templateUrl: './error-notice.component.html',
})
export class ErrorNoticeComponent implements OnInit, OnDestroy {
  constructor(private languageService: LanguageService) {}

  @Input() warn: any;
  @Input() parentConfig: any;
  errorMessage: string;

  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.parentConfig && this.parentConfig.error) {
              this.errorMessage = this.parentConfig.error[lang]
                ? this.parentConfig.error[lang]
                : this.parentConfig.error.default;
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
