import { ChangeDetectionStrategy, Component, OnInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, CmsService, StandardCmsComponentConfig, PaginationModel } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { InboxService } from '../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../my-account/assets/store';
import { CmsInboxComponent } from './../../../occ-models/cms-component.models';
import { SearchConfig } from '../../../my-account/assets/services/inbox-data.service';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected store: Store<fromStore.UserState>,
    private elRef: ElementRef
  ) {}

  pagination: PaginationModel;
  component$: Observable<CmsInboxComponent>;
  searchConfig: SearchConfig = {};
  subjectSortOrder: string;
  contentSortOrder: string;
  sentSortOrder: string;
  messages$;
  tabs;
  activeTabIndex = 0;
  activeGroupTitle: string;
  activeMessageGroup: string;

  ngOnInit() {
    this.subjectSortOrder = 'desc';
    this.contentSortOrder = 'desc';
    this.sentSortOrder = 'desc';
    this.component$ = this.componentData.data$;
    this.component$.subscribe( data => this.tabs = this.splitArray(data.tabComponents));
    this.loadGroup('', this.searchConfig); // Temporary solution for loading default message group
    this.inboxService.activeGroupTitle.subscribe( title => this.activeGroupTitle = title);
    this.inboxService.activeMessageGroup.subscribe( messageGroup => this.activeMessageGroup = messageGroup);
  }
  setActiveGroupTitle(title) {
    this.inboxService.setActiveGroupTitle(title);
  }
  setActiveTitle(title: string) {
    this.activeGroupTitle = title;
  }
  sort(sortCode, sortOrder) {
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    this.loadGroup(this.activeMessageGroup, this.searchConfig);
  }
  onTabSelected(messageGroup) {
    this.loadGroup(messageGroup, this.searchConfig);
  }
  splitArray(arrayToSplit: string): string[] {
    return arrayToSplit.split(' ');
  }
  loadGroup(group: string, searchConfig: SearchConfig) {
    this.inboxService.loadMessagesByMessageGroup(group, searchConfig);
    this.messages$ = this.store.pipe(select(fromStore.getMessages));
  }
}
