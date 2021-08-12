import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { WindowRef, User, CmsService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { EGender, GuestInfo } from '@syncpilot/bpool-guest-lib/models/guestinfo';

@Component({
  selector: 'cx-fs-sync-pilot-connection-component',
  templateUrl: './sync-pilot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncPilotConnectionComponent implements OnDestroy {
  constructor(
    protected cmsService: CmsService,
    protected userAccountFacade: UserAccountFacade,
    protected iService: Service,
    protected winRef?: WindowRef,
    // protected iSyncService: ISyncService
  ) {
    iService.setConfig({
      stompUrl: 'https://msg.dev.livecontract.net/beraterpoolServer/beraterpoolWS',
      serverUrlServer: 'https://msg.dev.livecontract.net/beraterpoolServer/beraterpool/server/v1',
      fullName: 'API Name'});
  }

  protected readonly SYNC_PILOT_WINDOW = 'Sync Pilot Window';
  protected readonly CHANNEL_PARAM = '?c=';
  protected readonly USER_PARAM = '&nick=';
  protected readonly ownerId = 1;

  component$: Observable<any> = this.cmsService.getComponentData(
    'SyncPilotConnectionComponent'
  );
  user$: Observable<User> = this.userAccountFacade.get();

  private subscription = new Subscription();

  establishConnection(targetUrl: string, channel: string, action: string) {
    this.component$.subscribe(console.log)
    console.log(targetUrl, 'targetUrl')
    console.log(channel, 'channel')
    console.log(action, 'action')
    this.subscription.add(
      this.user$
        .pipe(
          map(user => {
            if (user?.uid && user?.name) {
              const syncPilotUrl =
                targetUrl +
                action +
                this.CHANNEL_PARAM +
                channel +
                this.USER_PARAM +
                user.name;
              const syncPilotWindow = this.winRef.nativeWindow;
              syncPilotWindow.open(
                syncPilotUrl,
                this.SYNC_PILOT_WINDOW,
                null,
                false
              );
            }
          })
        )
        .subscribe()
    );
    this.connect();
    this.iService.onRedirect.subscribe((guestEndpoint) => {
      console.log('guestEndpoint', guestEndpoint);
      // if (guestEndpoint['targetChannelAdress']) {// redirect to this page    
      // }
      if(guestEndpoint.state == 'accepted') {
        const url = guestEndpoint.targetChannelAddress;
        }
    });
    // this.abort();
    // this.iService.connect(this.ownerId);
    // this.iService.onRedirect.subscribe(guestEndpoint => {
    //   console.log(guestEndpoint, 'guestEndpoint')
    // })
  }

  async connect() {
    const name = 'GuestName';
    const firstName = 'GuestFirstName';
    const gender = 'm';
    const additionalGuestInformation = new Map<string, string>();
    // const guestNotification = '';
    const groupId = 1;
    await this.iService.connect(this.ownerId);
    this.iService.enterQueue(this.createGuestInfo(firstName , name, gender, additionalGuestInformation), groupId);
  }

  createGuestInfo(firstName: string, lastName: string, gender: 'm' | 'w' | 'd', additionalGuestInformation: Map<string, string>): Partial<GuestInfo>{
    return {
          firstName,
          name: lastName,
          gender: gender as EGender,
          additionalGuestInformation
    } 
}

  async abort() {
    this.iService.abort();
  }

  sendMessage() {
    const text = document.getElementById('message')['value'];
    this.iService.sendGuestMessage(text);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
