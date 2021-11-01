import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CmsService, WindowRef } from '@spartacus/core';
import { CmsComponentData, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { SyncPilotConnectionComponent } from '../../sync-pilot/sync-pilot-connection.component';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';

@Component({
  selector: 'cx-fs-comparison-table-sync-pilot',
  templateUrl: './comparison-table-sync-pilot.component.html',
})
export class ComparisonTableSyncPilotComponent
  extends SyncPilotConnectionComponent
  implements OnInit, OnDestroy {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: Service,
    protected modalService: ModalService,
    protected agentService: AgentSearchService,
    protected componentData: CmsComponentData<CMSConnectionComponent>,
    protected winRef?: WindowRef
  ) {
    super(
      userAccountFacade,
      syncPilotService,
      modalService,
      agentService,
      componentData
    );
  }
  private sub = new Subscription();
  component$: Observable<any> = this.cmsService.getComponentData(
    'ComparisonTableSyncPilotComponent'
  );

  ngOnInit(): void {
    this.sub.add(
      this.component$.subscribe(data => {
        this.syncPilotService.setConfig({
          stompUrl: data.stompUrl,
          serverUrlServer: data.url,
        });
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
