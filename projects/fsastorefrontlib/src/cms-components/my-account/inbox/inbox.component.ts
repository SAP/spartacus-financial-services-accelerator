import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsService, AuthService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { InboxService } from '../../../core/my-account/services/inbox.service';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../../occ/occ-models/cms-component.models';
import { InboxDataService } from '../../../core/my-account/services/inbox-data.service';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    private inboxData: InboxDataService,
    protected auth: AuthService
  ) {}

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  initialTab$: Observable<CmsInboxTabComponent>;

  initialGroupName: string;
  mobileGroupTitle: string;
  activeTabIndex = 0;
  shouldShow = false;
  readState = false;

  tabs: string[];
  mainCheckboxChecked = false;
  childCheckboxes = false;

  ngOnInit() {
    this.subscription.add(
      this.auth.getUserToken().subscribe(userData => {
        if (this.inboxData.userId !== userData.userId) {
          this.inboxData.userId = userData.userId;
        }
      })
    );

    this.subscription.add(
      this.componentData.data$.subscribe(data => {
        this.tabs =
          data && data.tabComponents ? data.tabComponents.split(' ') : [];
      })
    );
    this.initialTab$ = this.cmsService.getComponentData(this.tabs[0]); // taking the first tab as initial/active on component load
    this.subscription.add(
      this.inboxService.checkAllMessages.subscribe(
        data => (this.mainCheckboxChecked = data)
      )
    );

    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle
        .pipe(
          mergeMap(currentTitle =>
            this.initialTab$.pipe(
              map(initial => {
                this.mobileGroupTitle =
                  currentTitle && currentTitle.title
                    ? currentTitle.title
                    : initial.title;
                this.initialGroupName = initial.messageGroup;
              })
            )
          )
        )
        .subscribe()
    );
  }

  resetAccordion() {
    this.inboxService.accordionStateSource.next(-1);
  }

  fromChildCheckbox($event) {
    this.inboxService.checkAllMessagesSource.next($event);
    this.mainCheckboxChecked = $event;
  }

  checkAllCheckboxes() {
    this.mainCheckboxChecked === true
      ? this.inboxService.checkAllMessagesSource.next(false)
      : this.inboxService.checkAllMessagesSource.next(true);
    this.subscription.add(
      this.inboxService.checkAllMessages.subscribe(checked => {
        checked === true
          ? (this.childCheckboxes = true)
          : (this.childCheckboxes = false);
      })
    );
  }

  changeMessagesReadState() {
    this.readState = !this.readState;
    const messagesUidList = this.inboxService.getUidsFromMessagesCollection();
    if (messagesUidList.length !== 0) {
      this.readState = this.inboxService.getMessagesAction();
      this.subscription.add(
        this.inboxService
          .setMessagesState(messagesUidList, this.readState)
          .subscribe()
      );
    }
  }

  sortMessages(sortCode, sortOrder) {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle
        .pipe(
          mergeMap(groupTitle => {
            const group =
              groupTitle === null
                ? this.initialGroupName
                : groupTitle.messageGroup;
            return this.inboxService
              .sortMessages(sortCode, sortOrder, group)
              .pipe(
                map(sortedMessages =>
                  this.inboxService.messagesSource.next(sortedMessages)
                )
              );
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
