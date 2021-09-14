import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '@spartacus/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { InboxService } from '../../core/inbox/facade/inbox.service';
import { FSSearchConfig } from '../../core/inbox/services/inbox-data.service';
import { UserProfileService } from '@spartacus/user/profile/core';

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
    protected userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.isUserLoggedIn();
    this.subscription.add(
      combineLatest([
        this.inboxService.unreadMessagesState$,
        this.userProfileService.get(),
      ])
        .pipe(
          filter(
            ([_isMessageRead, user]) => !!user && Object.keys(user).length !== 0
          )
          // tap(() => {
          //   this.messagesObject$ = this.inboxService.getMessages(
          //     '',
          //     this.searchConfig,
          //     false
          //   );
          //   this.changeDetectorRef.detectChanges();
          // })
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
