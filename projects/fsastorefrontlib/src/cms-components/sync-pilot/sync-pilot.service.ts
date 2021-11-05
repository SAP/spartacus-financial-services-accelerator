import { Injectable } from '@angular/core';
import { User, WindowRef } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Service } from '@syncpilot/bpool-guest-lib';
import { GuestEndpoint } from '@syncpilot/bpool-guest-lib/models/guestEndpoint';
import {
  EGender,
  GuestInfo,
} from '@syncpilot/bpool-guest-lib/models/guestinfo';
import { from, Observable, throwError } from 'rxjs';
import { catchError, tap, withLatestFrom } from 'rxjs/operators';
import { AgentSearchService } from '../../core/agent/facade/agent-search.service';
import { CMSConnectionComponent } from '../../occ/occ-models/cms-component.models';
import { SyncPilotGender } from '../../occ/occ-models/occ.models';
import { SyncPilotDialogComponent } from '../sync-pilot-dialog/sync-pilot-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SyncPilotService {
  constructor(
    protected rootSyncPilotService: Service,
    protected modalService: ModalService,
    protected agentService: AgentSearchService,
    protected winRef?: WindowRef
  ) {}

  logger(some) {
    console.log(some);
  }

  setSyncPilotConfig(data: CMSConnectionComponent) {
    console.log(data);
    this.rootSyncPilotService.setConfig({
      stompUrl: data.stompUrl,
      serverUrlServer: data.url,
    });
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

  establishConnection(ownerId: number): Observable<void> {
    return from(this.rootSyncPilotService.connect(ownerId));
  }

  enterQueue(ownerId: number, user: User): Observable<any> {
    return this.establishConnection(ownerId).pipe(
      tap(_ => {
        console.log('enterQueue');
        this.modalService.open(SyncPilotDialogComponent, {
          centered: true,
        });
        const additionalGuestInformation = new Map<string, string>();
        const groupId = 1;
        return this.rootSyncPilotService.enterQueue(
          this.createGuestInfo(
            user.firstName,
            user.name,
            SyncPilotGender[user.titleCode],
            additionalGuestInformation
          ),
          groupId
        );
      })
    );
  }

  redirectToAgent(): Observable<any> {
    return this.rootSyncPilotService.onRedirect.pipe(
      withLatestFrom((guestEndpoint: GuestEndpoint) => {
        if (guestEndpoint.state === 'accepted') {
          const url = guestEndpoint.targetChannelAddress;
          this.modalService.closeActiveModal();
          this.winRef.nativeWindow.open(url, '_blank');
        }
      })
    );
  }

  abortSyncPilotConnection(): Observable<boolean> {
    return this.agentService.cancelledSyncPilotAgent$.pipe(
      tap(_ => this.rootSyncPilotService.abort())
    );
  }
}
