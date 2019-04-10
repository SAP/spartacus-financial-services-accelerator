import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CmsComponentMapping,
  StandardCmsComponentConfig
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSSearchConfig } from '../../../../../my-account/assets/services/inbox-data.service';
import { InboxService } from '../../../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../../../my-account/assets/store';

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

  searchConfig: FSSearchConfig = {};
  changeCheckboxes: Observable<boolean>;
  messagesObject$;
  opened = false;

  ngOnInit() {
    this.inboxService.activeMessageGroup.subscribe(messageGroup => {
      this.loadGroup(messageGroup, this.searchConfig);
    });
    this.changeCheckboxes = this.inboxService.checkAllMessages;

    this.inboxService.checkAllMessages.subscribe(allChecked => {
      this.inboxService.resetMessagesToSend();
      this.messagesObject$.subscribe(data => {
        if (allChecked) {
          data.messages.forEach(message => {
            this.changeMessageState(message.readDate, message.uid);
          });
        }
      });
    });
  }
  readSingleMessage(message) {
    if (!message.ReadDate) {
      this.inboxService.readSingleMessage(message.uid);
    }
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
    this.inboxService.getMessagesAction();
  }
}
