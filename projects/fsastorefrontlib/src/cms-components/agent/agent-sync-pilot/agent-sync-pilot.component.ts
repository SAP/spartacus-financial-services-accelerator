import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService, User, WindowRef } from '@spartacus/core';
import {
  CmsComponentData,
  IconConfig,
  ModalService,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { SyncPilotConnectionComponent } from '../../sync-pilot/sync-pilot-connection.component';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';
import { tap } from 'rxjs/operators';
import { SyncPilotGender } from '../../../occ/occ-models/occ.models';
import { ICON_TYPE } from '../../../core/icon-config/icon-config';

@Component({
  selector: 'cx-fs-agent-sync-pilot',
  templateUrl: './agent-sync-pilot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentSyncPilotComponent extends SyncPilotConnectionComponent {
  @Input() agent;
  @Input() set type(type: ICON_TYPE) {
    this.agentIcon = this.iconConfig.icon.symbols[type];
  }
  agentIcon: string = this.iconConfig.icon.symbols[ICON_TYPE.PHONE];
  component$: Observable<any> = this.cmsService.getComponentData(
    'AgentSyncPilotComponent'
  );

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

  establishConnection(user: User, componentData: CMSConnectionComponent): void {
    const additionalGuestInformation = new Map<string, string>();
    this.setSyncPilotConfig(componentData);
    this.subscription.add(
      this.setConnection(this.ownerId)
        .pipe(
          tap(_ => {
            const guestInfo = this.createGuestInfo(
              user.firstName,
              user.name,
              SyncPilotGender[user.titleCode],
              additionalGuestInformation
            );
            this.syncPilotService.requestToConsultant(
              guestInfo,
              this.groupId,
              this.agent.externalId
            );
          })
        )
        .subscribe()
    );
  }
}
