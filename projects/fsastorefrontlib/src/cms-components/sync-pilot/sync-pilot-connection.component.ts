import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { WindowRef, User, CmsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Component({
  selector: 'cx-fs-sync-pilot-connection-component',
  templateUrl: './sync-pilot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotConnectionComponent implements OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected winRef?: WindowRef
  ) {}

  protected readonly SYNC_PILOT_WINDOW = 'Sync Pilot Window';
  protected readonly CHANNEL_PARAM = '?c=';
  protected readonly USER_PARAM = '&nick=';

  user$: Observable<User> = this.userAccountFacade.get();

  private subscription = new Subscription();

  establishConnection(targetUrl: string, channel: string, action: string) {
    this.subscription.add(
      this.user$
        .pipe(
          map(user => {
            if (user?.uid && user?.name) {
              const syncPilotUrl =
                targetUrl +
                action +
                this.CHANNEL_PARAM +
                channel +
                this.USER_PARAM +
                user.name;
              const syncPilotWindow = this.winRef.nativeWindow;
              syncPilotWindow.open(syncPilotUrl, this.SYNC_PILOT_WINDOW, null);
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
