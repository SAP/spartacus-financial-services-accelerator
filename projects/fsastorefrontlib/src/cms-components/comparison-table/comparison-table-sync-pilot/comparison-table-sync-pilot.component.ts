import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService, WindowRef } from '@spartacus/core';
import { CmsComponentData, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';

import { SyncPilotConnectionComponent } from '../../sync-pilot/sync-pilot-connection.component';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';

@Component({
  selector: 'cx-fs-comparison-table-sync-pilot',
  templateUrl: './comparison-table-sync-pilot.component.html',
})
export class ComparisonTableSyncPilotComponent
  extends SyncPilotConnectionComponent
  implements OnDestroy {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: Service,
    protected modalService: ModalService,
    public componentData: CmsComponentData<CMSConnectionComponent>,
    protected winRef?: WindowRef
  ) {
    super(userAccountFacade, syncPilotService, modalService, componentData);
  }
  component$: Observable<any> = this.cmsService.getComponentData(
    'ComparisonTableSyncPilotComponent'
  );
}
