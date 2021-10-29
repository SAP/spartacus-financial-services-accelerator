import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService, WindowRef } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
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
    protected syncPilotService: Service,
    protected modalService: ModalService,
    protected agentService: AgentSearchService,
    protected winRef?: WindowRef
  ) {
    super(userAccountFacade, syncPilotService, modalService, agentService);
  }

  component$: Observable<any> = this.cmsService.getComponentData(
    'SyncPilotConnectionComponent'
  );

  ngOnInit(): void {}
}
