import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, StandardCmsComponentConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { InboxService } from '../../../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../../../my-account/assets/store';
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
    protected inboxService: InboxService,
    protected store: Store<fromStore.UserState>
  ) {}

  @Input() changeCheckboxes: Observable<boolean>;
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
  changeMessageState(readDate, messageUid) {
    const messageObj = {
      readDate: readDate,
      messageUid: messageUid
    };
    this.inboxService.selectedMessages(messageObj);
  }
}
