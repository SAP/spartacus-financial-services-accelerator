import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { InboxService } from '../../../../../core/my-account/services/inbox.service';
import { SearchConfig } from '@spartacus/core';
import {
  Message,
  FSSearchConfig,
} from '../../../../../core/my-account/services/inbox-data.service';
import { CmsInboxTabComponent } from 'fsastorefrontlib/occ/occ-models';

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(private inboxService: InboxService) {}

  private subscription: Subscription = new Subscription();
  messagesObject$: Observable<any>;
  messageGroup: string;

  searchConfig: FSSearchConfig = {};
  loadedMessages: Message[] = [];

  envelopState = false;
  mainCheckboxChecked = false;

  @Input() initialGroup: string;
  @Input() mobileTabs: string[];
  @Input() mobileInitialTab: string;
  mobileGroupTitle: string;

  ngOnInit() {
    this.loadCurrentMessageGroup();
    this.messagesObject$ = this.inboxService.messages;
  }

  loadCurrentMessageGroup() {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle.subscribe(group => {
        this.messageGroup =
          group && group.messageGroup ? group.messageGroup : this.initialGroup;
        this.mobileGroupTitle =
          group && group.title ? group.title : this.mobileInitialTab;
        this.getMessages();
      })
    );
  }

  getMessages() {
    this.subscription.add(
      this.inboxService
        .getMessages(this.messageGroup, this.searchConfig)
        .subscribe(response => {
          this.loadedMessages = [];
          this.inboxService.messagesSource.next(response);
          this.searchConfig.currentPage = response.pagination.page;
          this.searchConfig.sortCode = response.sorts[0].code;
          this.searchConfig.sortOrder =
            response.sorts[0].asc === true ? 'asc' : 'desc';
          response.messages.forEach(message => {
            this.loadedMessages.push(this.buildDisplayMessage(message));
          });
        })
    );
  }

  readMessage(message: Message) {
    this.loadedMessages.forEach(msg => {
      if (!msg.read && msg.uid === message.uid) {
        msg.read = true;
        this.inboxService.setMessagesState([msg.uid], true).subscribe();
      }
    });
  }

  getDate() {
    return new Date();
  }

  pageChange(pageNumber: number) {
    this.mainCheckboxChecked = false;
    this.searchConfig.currentPage = pageNumber;
    this.loadCurrentMessageGroup();
  }

  checkMessage(messageUid: string, checked: boolean) {
    this.loadedMessages.forEach(message => {
      if (message.uid === messageUid) {
        message.checked = checked;
      }
    });
  }

  checkAllCheckboxes(checked: boolean) {
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    this.loadedMessages.forEach(message => {
      message.checked = checked;
    });
  }

  changeSelectedMessages(toRead: boolean) {
    this.envelopState = !this.envelopState;
    this.loadedMessages.forEach(message => {
      if (message.checked) {
        this.inboxService.setMessagesState([message.uid], toRead).subscribe();
        message.read = toRead;
        message.opened = false;
      }
    });
  }

  sortMessages(sortCode, sortOrder) {
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    this.subscription.add(
      this.inboxService
        .getMessages(this.messageGroup, this.searchConfig)
        .pipe(
          map(sortedMessages => {
            this.loadedMessages = [];
            sortedMessages.messages.forEach(message => {
              this.loadedMessages.push(this.buildDisplayMessage(message));
            });
            console.log(this.loadedMessages);
          })
        )
        .subscribe()
    );
  }

  buildDisplayMessage(message: any): Message {
    return {
      uid: message.uid,
      subject: message.subject,
      body: message.body,
      richContent: message.richContent,
      sentDate: message.sentDate,
      read: message.readDate != null ? true : false,
      checked: false,
      opened: false,
    };
  }

  ngOnDestroy() {
    this.inboxService.setTitleAndMessageGroup(null, null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
