import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-sync-pilot-connection-component',
  templateUrl: './sync-pilot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotConnectionComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<any>,
    protected userService: UserService,
    protected winRef?: WindowRef
  ) {}

  protected readonly SYNC_PILOT_WINDOW = 'Sync Pilot Window';
  protected readonly CHANNEL_PARAM = '?c=';
  protected readonly USER_PARAM = '&nick=';

  component$: Observable<any>;

  private subscription = new Subscription();

  ngOnInit() {
    this.component$ = this.componentData.data$;
  }

  establishConnection(targetUrl: string, channel: string, action: string) {
    this.subscription.add(
      this.userService
        .get()
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
              syncPilotWindow.open(
                syncPilotUrl,
                this.SYNC_PILOT_WINDOW,
                null,
                false
              );
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
