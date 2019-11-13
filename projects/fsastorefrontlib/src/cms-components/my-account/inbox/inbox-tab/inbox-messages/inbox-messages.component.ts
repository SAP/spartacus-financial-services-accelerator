import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  Message,
} from '../../../../../core/my-account/services/inbox-data.service';
import { InboxService } from '../../../../../core/my-account/services/inbox.service';

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(
    private inboxService: InboxService,
    private cdr: ChangeDetectorRef
  ) { }

  private subscription: Subscription;
  changeCheckboxes$: Observable<boolean>;
  messagesObject$: Observable<any>;
  selectedIndex: number;
  messageGroup: string;

  @Input() initialGroup: string;

  ngOnInit() {
    this.changeCheckboxes$ = this.inboxService.checkAllMessages;
    this.loadCurrentMessageGroup();
    this.messagesObject$ = this.inboxService.messages$;
  }

  loadCurrentMessageGroup() {
    this.subscription = this.inboxService.activeMessageGroupAndTitle.subscribe(
      group => {
        this.messageGroup =
          group && group.messageGroup ? group.messageGroup : this.initialGroup;
        this.getMessages();
        this.cdr.markForCheck();
      }
    );
  }

  getMessages() {
   this.inboxService.getMessages(this.messageGroup).subscribe(messages => this.inboxService.messagesSource.next(messages));
  }

  toggleActiveAccordion(index: number) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  readMessage(message: Message) {
    const uidList = [];
    if (message.readDate === undefined) {
      uidList.push(message.uid);
      this.inboxService.setMessagesState(uidList, true).subscribe();
    }
  }

  changeMessageState(readDate, messageUid) {
    const messageObj = {
      readDate: readDate,
      uid: messageUid,
    };
    this.inboxService.selectedMessages(messageObj);
    this.inboxService.getMessagesAction();
  }

  getDate() {
    return new Date();
  }

  getReadMessages(): string[] {
    return this.inboxService.readMessagesUidList;
  }

  ngOnDestroy() {
    this.inboxService.setTitleAndMessageGroup(null, null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
