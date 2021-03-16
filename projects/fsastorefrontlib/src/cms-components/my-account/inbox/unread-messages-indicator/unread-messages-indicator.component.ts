import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UserService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
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
      this.inboxService.unreadMessagesState.subscribe(isMessageRead => {
        if (isMessageRead) {
          this.getNumberOfUnreadMessages();
        }
      })
    );
    this.subscription.add(
      this.userService.get().subscribe(user => {
        if (user.name) {
          this.getNumberOfUnreadMessages();
        }
      })
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
