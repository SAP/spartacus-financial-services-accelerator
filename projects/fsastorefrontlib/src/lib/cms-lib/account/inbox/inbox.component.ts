import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  CmsComponentMapping,
  StandardCmsComponentConfig,
  CmsService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CmsInboxComponent } from './../../../occ-models/cms-component.models';
import { InboxService } from '../../../my-account/assets/services/inbox.service';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

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

  subscription: Subscription;
  component$: Observable<CmsInboxComponent>;
  messages$;
  tabs;
  mainCheckboxChecked = false;
  activeGroupTitle: string;
  activeMessageGroup: string;
  activeTabIndex = 0;
  subjectSortOrder = 'desc';
  contentSortOrder = 'desc';
  sentSortOrder = 'desc';
  readState;
  shouldShow = false;
  firstTab$;

  ngOnInit() {
    this.subscription = this.componentData.data$.subscribe(
      data => (this.tabs = data.tabComponents.split(' '))
    );
    this.firstTab$ = this.cmsService.getComponentData(this.tabs[0]); // taking the first tab as an active one on component load
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
