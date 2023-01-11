import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService, WindowRef } from '@spartacus/core';
import { CmsComponentData, IconConfig } from '@spartacus/storefront';
import { LaunchDialogService } from '@spartacus/storefront';

import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';

import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';
import { FS_ICON_TYPE } from '../../../core/icon-config/icon-config';
import { CmsSyncPilotComponent } from '../cms-sync-pilot/cms-sync-pilot.component';

@Component({
  selector: 'cx-fs-generic-sync-pilot',
  templateUrl: './generic-sync-pilot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericSyncPilotComponent
  extends CmsSyncPilotComponent
  implements OnChanges
{
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: Service,
    protected launchDialogService: LaunchDialogService,
    public componentData: CmsComponentData<CMSConnectionComponent>,
    protected iconConfig: IconConfig,
    protected winRef?: WindowRef
  ) {
    super(
      userAccountFacade,
      syncPilotService,
      launchDialogService,
      componentData
    );
  }

  @Input() agent: any;
  @Input() cmsComponent = 'GenericSyncPilotComponent';
  @Input() type = FS_ICON_TYPE.PHONE;
  agentIcon: string;
  component$: Observable<any>;

  ngOnChanges() {
    if (this.type) {
      this.agentIcon = this.iconConfig.icon.symbols[this.type];
    }
    this.component$ = this.cmsService.getComponentData(this.cmsComponent);
  }
}
