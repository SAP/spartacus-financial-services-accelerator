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

@Component({
  selector: 'fsa-messages-inbox',
  templateUrl: './inbox-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxMessagesComponent implements OnInit, OnDestroy {
  constructor(
    private inboxService: InboxService
  ) { }

  private subscription: Subscription = new Subscription();
  changeCheckboxes$: Observable<boolean>;
  messagesObject$: Observable<any>;
  selectedIndex: number;
  messageGroup: string;

  @Input() initialGroup: string;
  @Input() checkBoxStatus: boolean;
  @Output() mainCheckBoxState = new EventEmitter<boolean>();

  ngOnInit() {
    this.loadCurrentMessageGroup();
    this.messagesObject$ = this.inboxService.messages;
    this.changeCheckboxes$ = this.inboxService.checkAllMessages;
    this.subscription.add(
      this.changeCheckboxes$
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
        globalAccordionIndex => this.selectedIndex = globalAccordionIndex
      )
    );
  }

  loadCurrentMessageGroup() {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle.subscribe(group => {
        this.messageGroup =
          group && group.messageGroup ? group.messageGroup : this.initialGroup;
        this.getMessages();
      })
    );
  }

  getMessages() {
    this.subscription.add(
      this.inboxService
        .getMessages(this.messageGroup)
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
    this.inboxService.getMessagesAction();
  }

  mainCheckboxSwitch() {
    this.mainCheckBoxState.emit(false);
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
}
