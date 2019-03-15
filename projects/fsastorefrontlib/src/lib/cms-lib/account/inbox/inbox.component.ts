import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, CmsService, StandardCmsComponentConfig } from '@spartacus/core';
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
    protected store: Store<fromStore.UserState>
  ) {}

  @Output() changeCheckboxes = new EventEmitter();
  component$: Observable<CmsInboxComponent>;
  messages$;
  tabs;
  searchConfig: SearchConfig = {};
  mainCheckboxChecked: Boolean = false;
  subjectSortOrder: string;
  contentSortOrder: string;
  sentSortOrder: string;
  activeGroupTitle: string;
  activeMessageGroup: string;
  activeTabIndex = 0;

  ngOnInit() {
    this.subjectSortOrder = 'desc';
    this.contentSortOrder = 'desc';
    this.sentSortOrder = 'desc';
    this.component$ = this.componentData.data$;
    this.component$.subscribe( data => this.tabs = data.tabComponents.split(' '));
    this.loadGroup('', this.searchConfig); // Temporary solution for loading default message group
    this.inboxService.activeGroupTitle.subscribe( title => this.activeGroupTitle = title);
    this.inboxService.activeMessageGroup.subscribe( messageGroup => this.activeMessageGroup = messageGroup);
  }
  checkAllCheckboxes() {
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    this.changeCheckboxes.emit(this.mainCheckboxChecked);
  }
  sort(sortCode, sortOrder) {
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    this.loadGroup(this.activeMessageGroup, this.searchConfig);
  }
  setMessagesState() {
    this.inboxService.changeMessageListState();
  }
  onTabSelected(messageGroup) {
    this.loadGroup(messageGroup, this.searchConfig);
  }
  loadGroup(group: string, searchConfig: SearchConfig) {
    this.inboxService.loadMessagesByMessageGroup(group, searchConfig);
    this.messages$ = this.store.pipe(select(fromStore.getMessages));
  }
}
