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

@Component({
  selector: 'cx-fs-message-notification',
  templateUrl: './message-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageNotificationComponent implements OnInit, OnDestroy {
  numberOfUnreadMessages$: Observable<number>;
  user$: Observable<boolean>;
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
            this.numberOfUnreadMessages$ = this.inboxService.getNumberOfUnreadMessages();
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
