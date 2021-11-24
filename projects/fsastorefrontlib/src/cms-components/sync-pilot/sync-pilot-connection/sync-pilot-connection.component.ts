import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WindowRef, User } from '@spartacus/core';
import { CmsComponentData, ModalService } from '@spartacus/storefront';
import { from, Observable, Subscription } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { GuestEndpoint } from '@syncpilot/bpool-guest-lib/models/guestEndpoint';
import {
  EGender,
  GuestInfo,
} from '@syncpilot/bpool-guest-lib/models/guestinfo';
import { SyncPilotGender } from '../../../occ/occ-models/occ.models';
import { SyncPilotDialogComponent } from '../../sync-pilot-dialog/sync-pilot-dialog.component';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';
import {
  GROUP_ID,
  OWNER_ID,
} from '../../../core/sync-pilot-config/sync-pilot-config';

@Component({
  selector: 'cx-fs-sync-pilot-connection-component',
  templateUrl: './sync-pilot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotConnectionComponent implements OnInit, OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected syncPilotService: Service,
    protected modalService: ModalService,
    public componentData: CmsComponentData<CMSConnectionComponent>,
    protected winRef?: WindowRef
  ) {}

  protected subscription = new Subscription();
  user$: Observable<User> = this.userAccountFacade.get();

  ngOnInit() {
    this.redirectToAgent();
  }

  setSyncPilotConfig(data: CMSConnectionComponent) {
    this.syncPilotService.setConfig({
      stompUrl: data.stompUrl,
      serverUrlServer: data.url,
    });
  }

  setConnection(ownerID: number): Observable<void> {
    this.modalService.open(SyncPilotDialogComponent, {
      centered: true,
    });
    return from(this.syncPilotService.connect(ownerID));
  }

  establishConnection(
    user: User,
    componentData: CMSConnectionComponent,
    agent?: any
  ): void {
    const additionalGuestInformation = new Map<string, string>();
    this.setSyncPilotConfig(componentData);
    this.subscription.add(
      this.setConnection(OWNER_ID)
        .pipe(
          tap(_ => {
            const guestInfo = this.createGuestInfo(
              user.firstName,
              user.name,
              SyncPilotGender[user.titleCode],
              additionalGuestInformation
            );
            !agent
              ? this.syncPilotService.enterQueue(guestInfo, GROUP_ID)
              : this.syncPilotService.requestToConsultant(
                  guestInfo,
                  GROUP_ID,
                  agent.externalId
                );
          })
        )
        .subscribe()
    );
  }

  createGuestInfo(
    firstName: string,
    lastName: string,
    gender: 'm' | 'w' | 'd',
    additionalGuestInformation: Map<string, string>
  ): Partial<GuestInfo> {
    return {
      firstName,
      name: lastName,
      gender: gender as EGender,
      additionalGuestInformation,
    };
  }

  redirectToAgent() {
    this.subscription.add(
      this.syncPilotService.onRedirect
        .pipe(
          withLatestFrom((guestEndpoint: GuestEndpoint) => {
            if (guestEndpoint.state === 'accepted') {
              const url = guestEndpoint.targetChannelAddress;
              this.modalService.closeActiveModal();
              this.winRef.nativeWindow.open(url, '_blank');
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
