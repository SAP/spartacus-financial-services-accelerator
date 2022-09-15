import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService, UserIdService } from '@spartacus/core';
import { combineLatest, Subscription } from 'rxjs';
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
    protected languageService: LanguageService,
    protected userIdService: UserIdService
  ) {}

  private subscription = new Subscription();
  changeRequest$: Observable<any>;
  language: string;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.subscription.add(
      combineLatest([
        this.changeRequest$,
        this.languageService.getActive(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([changeRequest]) => !!changeRequest?.requestId),
          tap(([changeRequest, lang, userId]) => {
            if (this.language && this.language !== lang) {
              this.changeRequestService.loadChangeRequest(
                changeRequest.requestId,
                userId
              );
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
