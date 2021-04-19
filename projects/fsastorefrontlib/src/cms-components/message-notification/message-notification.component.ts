import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService, UserService } from '@spartacus/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { InboxService } from '../../core/my-account/facade/inbox.service';
import { FSSearchConfig } from '../../core/my-account/services/inbox-data.service';

@Component({
  selector: 'cx-fs-message-notification',
  templateUrl: './message-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageNotificationComponent implements OnInit, OnDestroy {
  messagesObject$: Observable<any>;
  user$: Observable<boolean>;
  searchConfig: FSSearchConfig = {
    currentPage: 0,
  };
  subscription = new Subscription();

  constructor(
    protected inboxService: InboxService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected authService: AuthService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.isUserLoggedIn();
    this.subscription.add(
      combineLatest([
        this.inboxService.unreadMessagesState$,
        this.userService.get(),
      ])
        .pipe(
          filter(([isMessageRead, user]) => Object.keys(user).length !== 0),
          tap(() => {
            this.messagesObject$ = this.inboxService.getMessages(
              '',
              this.searchConfig,
              false
            );
            this.changeDetectorRef.detectChanges();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
