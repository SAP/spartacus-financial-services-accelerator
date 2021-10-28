import { Component, OnInit } from '@angular/core';
import { CmsService, WindowRef } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { SyncPilotConnectionComponent } from '../../sync-pilot/sync-pilot-connection.component';

@Component({
  selector: 'cx-fs-comparison-table-sync-pilot',
  templateUrl: './comparison-table-sync-pilot.component.html',
})
export class ComparisonTableSyncPilotComponent
  extends SyncPilotConnectionComponent
  implements OnInit {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected winRef?: WindowRef
  ) {
    super(userAccountFacade, winRef);
  }

  component$: Observable<any> = this.cmsService.getComponentData(
    'SyncPilotConnectionComponent'
  );

  ngOnInit(): void {}
}
