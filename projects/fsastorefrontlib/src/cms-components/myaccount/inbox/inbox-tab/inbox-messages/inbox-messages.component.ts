import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OccInboxService } from '../../../../../occ/services/inbox/inbox.service';
import {
  FSSearchConfig,
  InboxDataService,
} from '../../../../../core/myaccount/services/inbox-data.service';
import { InboxService } from '../../../../../core/myaccount/services/inbox.service';

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
  ) {}

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
    this.inboxService.setTitleAndMessageGroup(null, null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
