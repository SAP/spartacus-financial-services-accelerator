import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, CmsService, StandardCmsComponentConfig } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { InboxService } from '../../../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../../../my-account/assets/store';
import { CmsInboxComponent } from './../../../../../occ-models/cms-component.models';
import { FSSearchConfig } from '../../../../../my-account/assets/services/inbox-data.service';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  styleUrls: ['./inbox-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxMessagesComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected store: Store<fromStore.UserState>
  ) {}

  @Input() changeCheckboxes: Observable<boolean>;
  component$: Observable<CmsInboxComponent>;
  searchConfig: FSSearchConfig = {};
  messagesObject$;
  activeMessageGroup;
  messagesAction$;
  opened = false;

  ngOnInit() {
    this.loadGroup('', this.searchConfig);
    this.messagesAction$ = this.changeCheckboxes;
    this.inboxService.activeMessageGroup.subscribe( messageGroup => {
      this.activeMessageGroup = messageGroup;
      this.loadGroup(this.activeMessageGroup, this.searchConfig);
    });
  }
  readSingleMessage(messageUid) {
    this.inboxService.readSingleMessage(messageUid);
  }
  loadGroup(group: string, searchConfig) {
    this.inboxService.loadMessagesByMessageGroup(group, searchConfig);
    this.messagesObject$ = this.store.pipe(select(fromStore.getMessages));
  }
  sendMessageState(readDate, messageUid) {
    const messageObj = {
      readDate: readDate,
      messageUid: messageUid
    };
    this.inboxService.selectedMessages(messageObj);
  }
}
