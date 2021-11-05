import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CmsService, User, WindowRef } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';
import { SyncPilotService } from '../../sync-pilot/sync-pilot.service';

@Component({
  selector: 'cx-fs-comparison-table-sync-pilot',
  templateUrl: './comparison-table-sync-pilot.component.html',
})
export class ComparisonTableSyncPilotComponent implements OnInit, OnDestroy {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: SyncPilotService,
    protected winRef?: WindowRef
  ) {}

  protected subscription = new Subscription();
  user$: Observable<User> = this.userAccountFacade.get();
  protected readonly ownerId = 1;

  component$: Observable<any> = this.cmsService.getComponentData(
    'ComparisonTableSyncPilotComponent'
  );

  ngOnInit(): void {
    this.redirectToAgent();
    this.abortConnectionToSyncPilot();
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
