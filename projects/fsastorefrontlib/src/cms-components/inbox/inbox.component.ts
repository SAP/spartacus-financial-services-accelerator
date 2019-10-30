import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../occ/occ-models/cms-component.models';
import { InboxService } from '../../lib/my-account/assets/services/inbox.service';

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
  ) {}

  subscription = new Subscription();
  component$: Observable<CmsInboxComponent>;
  initialTab$: Observable<CmsInboxTabComponent>;
  tabs;
  mobileGroupTitle: string;
  activeMessageGroup: string;
  activeTabIndex = 0;
  initialGroupName: string;
  shouldShow = false;

  // To be used in the next Inbox task
  mainCheckboxChecked = false;
  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';
  readState;

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
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
