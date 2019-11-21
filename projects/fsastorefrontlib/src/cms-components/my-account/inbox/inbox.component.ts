import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { InboxService } from '../../../core/my-account/services/inbox.service';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../../occ/occ-models/cms-component.models';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService
  ) { }

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  initialTab$: Observable<CmsInboxTabComponent>;

  initialGroupName: string;
  mobileGroupTitle: string;
  activeTabIndex = 0;
  shouldShow = false;
  readState: boolean;

  tabs: string[];
  mainCheckboxChecked: boolean;

  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$.subscribe(
        data => (this.tabs = data.tabComponents.split(' '))
      )
    );
    this.initialTab$ = this.cmsService.getComponentData(this.tabs[0]); // taking the first tab as initial/active on component load

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

    this.subscription.add(
      this.inboxService.checkAllMessages.subscribe(
        check => (this.mainCheckboxChecked = check)
      )
    );
  }

  resetAccordion() {
    this.inboxService.accordionStateSource.next(-1);
  }

  checkAllCheckboxes() {
    this.inboxService.checkAllMessagesSource.next(!this.mainCheckboxChecked);
  }

  changeMessagesReadState() {
    const messagesUidList = this.inboxService.getUidsFromMessagesCollection();
    if (messagesUidList.length === 0) {
      return;
    }
    this.readState = this.inboxService.getMessagesAction();
    this.inboxService
      .setMessagesState(messagesUidList, this.readState)
      .subscribe();
  }

  sortMessages(sortCode, sortOrder) {
    this.subscription.add(
      this.inboxService.activeMessageGroupAndTitle.subscribe(groupTitle => {
        let group;
        if (groupTitle == null) {
          group = this.initialGroupName;
        } else {
          group = groupTitle.messageGroup;
        }
        this.inboxService
          .sortMessages(sortCode, sortOrder, group)
          .subscribe(sortedMessages =>
            this.inboxService.messagesSource.next(sortedMessages)
          );
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
