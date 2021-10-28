import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WindowRef, User } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import {
  EGender,
  GuestInfo,
} from '@syncpilot/bpool-guest-lib/models/guestinfo';
import { GuestEndpoint } from '@syncpilot/bpool-guest-lib/models/guestEndpoint';
import { SyncPilotDialogComponent } from '../sync-pilot-dialog/sync-pilot-dialog.component';
import { AgentSearchService } from '../../core/agent/facade/agent-search.service';
import { SyncPilotGender } from '../../occ/occ-models/occ.models';

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
    protected agentService: AgentSearchService,
    protected winRef?: WindowRef
  ) {}

  private subscription = new Subscription();
  protected readonly ownerId = 1;
  user$: Observable<User> = this.userAccountFacade.get();

  ngOnInit() {
    this.setConfigurationForSyncPilot();
    this.redirectToAgent();
    this.abortConnectionToSyncPilot();
  }

  setConfigurationForSyncPilot() {
    this.syncPilotService.setConfig({
      stompUrl:
        'https://msg.dev.livecontract.net/beraterpoolServer/beraterpoolWS',
      serverUrlServer:
        'https://msg.dev.livecontract.net/beraterpoolServer/beraterpool/server/v1',
    });
  }

  establishConnection() {
    this.subscription.add(
      this.user$
        .pipe(
          map((user: User) => {
            this.connectToSyncPilot(user);
            this.modalService.open(SyncPilotDialogComponent, {
              centered: true,
            });
          })
        )
        .subscribe()
    );
  }

  async connectToSyncPilot(user: User): Promise<void> {
    const additionalGuestInformation = new Map<string, string>();
    const groupId = 1;
    await this.syncPilotService.connect(this.ownerId);
    this.syncPilotService.enterQueue(
      this.createGuestInfo(
        user.firstName,
        user.name,
        SyncPilotGender[user.titleCode],
        additionalGuestInformation
      ),
      groupId
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

  abortConnectionToSyncPilot() {
    this.subscription.add(
      this.agentService.cancelledSyncPilotAgent$
        .pipe(tap(_ => this.syncPilotService.abort()))
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
