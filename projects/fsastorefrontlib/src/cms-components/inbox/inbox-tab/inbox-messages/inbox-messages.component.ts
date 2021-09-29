import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import * as e from 'express';
import {
  InboxDataState,
  InboxState,
} from 'projects/fsastorefrontlib/src/core/inbox/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { InboxService } from '../../../../core/inbox/facade/inbox.service';
import {
  FSSearchConfig,
  InboxMessage,
} from '../../../../core/inbox/services/inbox-data.service';

@Component({
  selector: 'cx-fs-inbox-messages',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnChanges, OnInit, OnDestroy {
  constructor(protected inboxService: InboxService) {}

  private subscription: Subscription = new Subscription();
  // messagesObject$: Observable<any>;
  messageGroup = 'generalMessageGroup';
  pagination: PaginationModel;

  searchConfig: FSSearchConfig = {
    currentPage: 0,
  };

  envelopState = false;
  mainCheckboxChecked = false;

  @Input() initialGroup: string;
  @Input() mobileTabs: string[];
  @Input() mobileInitialTab: string;
  @Input() tabIndex: number;
  mobileGroupTitle: string;
  displayMobileGroups = false;

  activeTabIndex = 0;
  selectedIndex = -1;
  defaultSortOrder = 'desc';
  ghostData: any;

  loadedMessages$: Observable<any>;

  ngOnChanges() {
    this.loadedMessages$ = this.inboxService.getMessages().pipe(
      filter(data => !!data),
      map(msgGroup => {
        const index = msgGroup.findIndex(
          (inboxData: InboxDataState) =>
            inboxData.messageGroup === this.messageGroup
        );
        return msgGroup[index]?.messages;
      })
    );
  }

  ngOnInit() {
    this.setCurrentMessageGroup();
  }

  setCurrentMessageGroup() {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle
        .pipe(
          map(group => {
            if (group?.messageGroup !== this.messageGroup) {
              this.clearSearchData();
            }
            this.mainCheckboxChecked = false;
            this.messageGroup =
              group && group.messageGroup
                ? group.messageGroup
                : this.initialGroup;
            this.mobileGroupTitle =
              group && group.title ? group.title : this.mobileInitialTab;
          }),
          switchMap(_ => this.loadMessageGroup())
        )
        .subscribe()
    );
  }

  loadMessageGroup(): Observable<any> {
    return this.inboxService.setGhostData().pipe(
      tap(response => {
        this.ghostData = response;
      }),
      switchMap(_ =>
        this.inboxService.loadMessages(this.messageGroup, this.searchConfig)
      )
    );
  }

  toggleActiveAccordion(index: number) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  // getMessages() {
  //   const newMessageList = [];

  //   return this.inboxService
  //     .getMessages(this.messageGroup, this.searchConfig)
  //     .pipe(
  //       tap(response => {
  //         this.ghostData = response;
  //         this.inboxService.messagesSource.next(false);
  //       }),
  //       filter(response => !response.values),
  //       map(response => {
  //         this.pagination = {
  //           currentPage: response.pagination.page,
  //           pageSize: response.pagination.count,
  //           totalPages: response.pagination.totalPages,
  //           totalResults: response.pagination.totalCount,
  //         };
  //         this.inboxService.messagesSource.next(response);
  //         if (response.sorts.length > 0 && response.pagination) {
  //           this.searchConfig.currentPage = response.pagination.page;
  //           this.searchConfig.sortCode = response.sorts[0].code;
  //           this.searchConfig.sortOrder =
  //             response.sorts[0].asc === true ? 'asc' : 'desc';
  //         }
  //         response.messages.forEach(message => {
  //           newMessageList.push(this.buildDisplayMessage(message));
  //         });
  //         this.loadedMessages = newMessageList;
  //       })
  //     );
  // }

  // readMessage(message: InboxMessage) {
  //   this.loadedMessages.forEach(msg => {
  //     if (!msg.read && msg.uid === message.uid) {
  //       msg.read = true;
  //       this.subscription.add(
  //         this.inboxService
  //           .setMessagesState([msg.uid], true)
  //           .pipe(tap(() => this.inboxService.setUnreadMessageState(msg.read)))
  //           .subscribe()
  //       );
  //     }
  //   });
  // }

  pageChange(pageNumber: number) {
    this.mainCheckboxChecked = false;
    this.searchConfig.currentPage = pageNumber;
    // this.setCurrentMessageGroup();
  }

  clearSearchData() {
    // this.searchConfig.currentPage = 0;
  }

  checkMessage(messageUid: string, checked: boolean) {
    if (!checked) {
      this.mainCheckboxChecked = false;
    }
    // this.loadedMessages.forEach(message => {
    //   if (message.uid === messageUid) {
    //     message.checked = checked;
    //   }
    // });
  }

  checkAllCheckboxes(checked: boolean) {
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    // this.loadedMessages.forEach(message => {
    //   message.checked = checked;
    // });
  }

  changeSelectedMessages(toRead: boolean) {
    this.envelopState = !this.envelopState;
    // const selectedMessages = this.loadedMessages
    //   .filter(message => message.checked)
    //   .map(message => {
    //     message.read = toRead;
    //     message.opened = false;
    //     return message.uid;
    //   });
    // if (selectedMessages.length > 0) {
    //   this.subscription.add(
    //     this.inboxService
    //       .setMessagesState(selectedMessages, toRead)
    //       .pipe(tap(() => this.inboxService.setUnreadMessageState(true)))
    //       .subscribe()
    //   );
    // }
  }

  sortMessages(sortCode, sortOrder) {
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    // this.getMessages();
  }

  buildDisplayMessage(message: any): InboxMessage {
    return {
      uid: message.uid,
      subject: message.subject,
      body: message.body,
      richContent: message.richContent,
      sentDate: message.sentDate,
      documents: message.documents,
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
