import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InboxService } from '../../../../core/my-account/facade/inbox.service';

@Component({
  selector: 'cx-fs-unread-messages-indicator',
  templateUrl: './unread-messages-indicator.component.html',
})
export class UnreadMessagesIndicatorComponent implements OnInit, OnDestroy {
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
      this.inboxService.unreadMessagesState
        .pipe(
          filter(isMessageRead => !!isMessageRead),
          map(() => this.getNumberOfUnreadMessages())
        )
        .subscribe()
    );
    this.subscription.add(
      this.userService
        .get()
        .pipe(
          filter(user => Object.keys(user).length !== 0),
          map(() => this.getNumberOfUnreadMessages())
        )
        .subscribe()
    );
  }

  getNumberOfUnreadMessages() {
    this.numberOfUnreadMessages$ = this.inboxService.getNumberOfUnreadMessages();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
