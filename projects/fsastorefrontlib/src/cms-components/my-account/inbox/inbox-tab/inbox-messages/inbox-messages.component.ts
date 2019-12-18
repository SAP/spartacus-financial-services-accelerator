import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take, mergeMap, map } from 'rxjs/operators';
import { Message } from '../../../../../core/my-account/services/inbox-data.service';
import { InboxService } from '../../../../../core/my-account/services/inbox.service';
import { SearchConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(private inboxService: InboxService) {}

  private subscription: Subscription = new Subscription();
  messagesObject$: Observable<any>;
  selectedIndex: number;
  messageGroup: string;

  searchConfig: SearchConfig = {};

  @Input() initialGroup: string;
  @Input() checkBoxStatus: boolean;
  @Output() mainCheckBoxState = new EventEmitter<boolean>();

  ngOnInit() {
    this.loadCurrentMessageGroup();
    this.messagesObject$ = this.inboxService.messages;
    this.subscription.add(
      this.inboxService.checkAllMessages
        .pipe(
          mergeMap(allChecked => {
            this.inboxService.resetMessagesToSend();
            return this.messagesObject$.pipe(
              take(1),
              map(data => {
                if (allChecked) {
                  return data.messages.forEach(message => {
                    this.changeMessageState(message.readDate, message.uid);
                  });
                }
              })
            );
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.inboxService.accordionState.subscribe(
        globalAccordionIndex => (this.selectedIndex = globalAccordionIndex)
      )
    );
  }

  loadCurrentMessageGroup() {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle.subscribe(group => {
        this.messageGroup =
          group && group.messageGroup ? group.messageGroup : this.initialGroup;
        this.getMessages(this.searchConfig);
      })
    );
  }

  getMessages(searchConfig: SearchConfig) {
    this.subscription.add(
      this.inboxService
        .getMessages(this.messageGroup, searchConfig.currentPage)
        .subscribe(messages => this.inboxService.messagesSource.next(messages))
    );
  }

  toggleActiveAccordion(index: number) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  readMessage(message: Message) {
    const uidList = [];
    if (message.readDate === undefined) {
      uidList.push(message.uid);
      this.subscription.add(
        this.inboxService.setMessagesState(uidList, true).subscribe()
      );
    }
  }

  changeMessageState(readDate, messageUid) {
    const messageObj = {
      readDate: readDate,
      uid: messageUid,
    };
    this.inboxService.selectedMessages(messageObj);
    if (this.checkBoxStatus === true) {
      this.inboxService.getMessagesAction();
    }
  }

  mainCheckboxSwitch() {
    if (this.checkBoxStatus === true) {
      this.mainCheckBoxState.emit(false);
    }
  }

  getDate() {
    return new Date();
  }

  ngOnDestroy() {
    this.inboxService.setTitleAndMessageGroup(null, null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  pageChange(pageNumber: number) {
    this.searchConfig.currentPage = pageNumber;
    this.loadCurrentMessageGroup();
  }
}
