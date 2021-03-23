import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserService } from '@spartacus/core';
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
    protected userService: UserService
  ) {}

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
              const syncPilotUrl = targetUrl + action;
              window.open(
                syncPilotUrl +
                  this.CHANNEL_PARAM +
                  channel +
                  this.USER_PARAM +
                  user.name,
                '_blank'
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
