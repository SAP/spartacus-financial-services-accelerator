import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
// import {
//   CmsComponentMapping,
//   StandardCmsComponentConfig,
// } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { OccInboxService } from '../../../../../occ/inbox/inbox.service';
import {
  FSSearchConfig,
  InboxDataService,
} from '../../../../../my-account/assets/services/inbox-data.service';
import { InboxService } from '../../../../../my-account/assets/services/inbox.service';

// export interface Mapping extends StandardCmsComponentConfig {
//   CMSInboxTabComponent?: CmsComponentMapping;
// }

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(
    private occInboxService: OccInboxService,
    private inboxService: InboxService,
    private inboxData: InboxDataService,
    private cdr: ChangeDetectorRef
  ) { }

  private subscription: Subscription;
  searchConfig: FSSearchConfig = {};
  changeCheckboxe$: Observable<boolean>;
  messagesObject$: Observable<any>;
  selectedIndex: number;
  messageGroup: string;

  @Input() initialGroup: string;

  ngOnInit() {
    this.loadCurrentMessageGroup();
  }

  loadCurrentMessageGroup() {
    this.subscription = this.inboxService.activeMessageGroup.subscribe(
      group => {
        this.messageGroup = group ? group : this.initialGroup;
        this.getMessages();
        this.cdr.markForCheck();
      }
    );
  }
  getMessages() {
    this.messagesObject$ = this.occInboxService.getSiteMessagesForUserAndGroup(
      this.inboxData.userId,
      this.messageGroup,
      this.searchConfig
    );
    this.selectedIndex = -1;
  }
  toggleActiveAccordion(index: number) {
    this.selectedIndex === index
      ? (this.selectedIndex = -1)
      : (this.selectedIndex = index);
  }

  ngOnDestroy() {
    this.inboxService.setActiveMessageGroup(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
