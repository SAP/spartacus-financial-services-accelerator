import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService, WindowRef } from '@spartacus/core';
import {
  CmsComponentData,
  IconConfig,
  ModalService,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';

import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';
import { FS_ICON_TYPE } from '../../../core/icon-config/icon-config';
import { SyncPilotCmsComponent } from '../sync-pilot-cms/sync-pilot-cms.component';

@Component({
  selector: 'cx-fs-sync-pilot-generic',
  templateUrl: './sync-pilot-generic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotGenericComponent extends SyncPilotCmsComponent
  implements OnChanges {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: Service,
    protected modalService: ModalService,
    public componentData: CmsComponentData<CMSConnectionComponent>,
    protected iconConfig: IconConfig,
    protected winRef?: WindowRef
  ) {
    super(userAccountFacade, syncPilotService, modalService, componentData);
  }

  @Input() agent: any;
  @Input() cmsComponent = 'SyncPilotGenericComponent';
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
