import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, tap } from 'rxjs/operators';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'cx-fs-change-process-progress-bar',
  templateUrl: './change-process-progress-bar.component.html',
})
export class ChangeProcessProgressBarComponent implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected languageService: LanguageService
  ) {}

  changeRequest$: Observable<any>;
  private subscription = new Subscription();
  language: string;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.changeRequest$.subscribe(data => console.log(data, 'data'));
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          tap(lang => {
            console.log(lang, 'lang');
            if (this.language && this.language !== lang) {
              this.changeRequestService.loadChangeRequest();
            }
            this.language = lang;
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
