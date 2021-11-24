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
import { ICON_TYPE } from '../../../core/icon-config/icon-config';
import { SyncPilotConnectionComponent } from '../../sync-pilot/sync-pilot-connection/sync-pilot-connection.component';

@Component({
  selector: 'cx-fs-sync-pilot',
  templateUrl: './sync-pilot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSSyncPilotComponent extends SyncPilotConnectionComponent
  implements OnChanges {
  @Input() agent: any;
  @Input() cmsComponent = 'FSSyncPilotComponent';
  @Input() set type(type: ICON_TYPE) {
    this.agentIcon = this.iconConfig.icon.symbols[type];
  }
  agentIcon: string = this.iconConfig.icon.symbols[ICON_TYPE.PHONE];
  component$: Observable<any>;

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

  ngOnChanges() {
    this.component$ = this.cmsService.getComponentData(this.cmsComponent);
  }
}
