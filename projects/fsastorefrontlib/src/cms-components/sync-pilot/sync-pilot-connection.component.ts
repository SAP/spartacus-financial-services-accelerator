import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WindowRef, User } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { CMSConnectionComponent } from '../../occ/occ-models/cms-component.models';
import { SyncPilotService } from './sync-pilot.service';

@Component({
  selector: 'cx-fs-sync-pilot-connection-component',
  templateUrl: './sync-pilot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotConnectionComponent implements OnInit, OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: SyncPilotService,
    protected componentData: CmsComponentData<CMSConnectionComponent>,
    protected winRef?: WindowRef
  ) {}

  protected subscription = new Subscription();
  protected readonly ownerId = 1;
  user$: Observable<User> = this.userAccountFacade.get();
  component$: Observable<any> = this.componentData.data$;

  ngOnInit() {
    this.redirectToAgent();
    this.abortConnectionToSyncPilot();
  }

  setConfigurationForSyncPilot() {
    this.subscription.add(
      this.componentData.data$.subscribe(data => {
        this.syncPilotService.setSyncPilotConfig(data);
      })
    );
  }

  enterQueue(user: User, component: CMSConnectionComponent) {
    this.syncPilotService.setSyncPilotConfig(component);
    this.subscription.add(
      this.syncPilotService.enterQueue(this.ownerId, user).subscribe()
    );
  }

  redirectToAgent() {
    this.subscription.add(this.syncPilotService.redirectToAgent().subscribe());
  }

  abortConnectionToSyncPilot() {
    this.subscription.add(
      this.syncPilotService.abortSyncPilotConnection().subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
