import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InboxService } from '../../../../../core/my-account/services/inbox.service';
import {
  Message,
  FSSearchConfig,
} from '../../../../../core/my-account/services/inbox-data.service';

@Component({
  selector: 'fsa-inbox-messages',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(private inboxService: InboxService) {}

  private subscription: Subscription = new Subscription();
  messagesObject$: Observable<any>;
  messageGroup: string;

  searchConfig: FSSearchConfig = {
    currentPage: 0,
  };
  loadedMessages: Message[] = [];

  envelopState = false;
  mainCheckboxChecked = false;

  @Input() initialGroup: string;
  @Input() mobileTabs: string[];
  @Input() mobileInitialTab: string;
  mobileGroupTitle: string;

  // VARBIABLES WHICH ARE USED ONLY IN TEMPLATE AND COULD BE REMOVED
  activeTabIndex = 0;
  shouldShow = false;
  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';
  // END

  ngOnInit() {
    this.loadCurrentMessageGroup();
    this.messagesObject$ = this.inboxService.messages;
  }

  loadCurrentMessageGroup() {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle.subscribe(group => {
        if (
          group &&
          group.messageGroup &&
          group.messageGroup !== this.messageGroup
        ) {
          this.clearSearchData();
        }
        this.messageGroup =
          group && group.messageGroup ? group.messageGroup : this.initialGroup;
        this.mobileGroupTitle =
          group && group.title ? group.title : this.mobileInitialTab;
        this.getMessages();
      })
    );
  }

  getMessages() {
    const newMessageList = [];
    this.subscription.add(
      this.inboxService
        .getMessages(this.messageGroup, this.searchConfig)
        .subscribe(response => {
          this.inboxService.messagesSource.next(response);
          if (response.sorts.length > 0 && response.pagination) {
            this.searchConfig.currentPage = response.pagination.page;
            this.searchConfig.sortCode = response.sorts[0].code;
            this.searchConfig.sortOrder =
              response.sorts[0].asc === true ? 'asc' : 'desc';
          }
          response.messages.forEach(message => {
            newMessageList.push(this.buildDisplayMessage(message));
          });
          this.loadedMessages = newMessageList;
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

  clearSearchData() {
    this.searchConfig.currentPage = 0;
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
    const selectedMessages = this.loadedMessages
      .filter(message => message.checked)
      .map(message => {
        message.read = toRead;
        message.opened = false;
        return message.uid;
      });
    if (selectedMessages.length > 0) {
      this.inboxService.setMessagesState(selectedMessages, toRead).subscribe();
    }
  }

  sortMessages(sortCode, sortOrder) {
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    this.getMessages();
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
