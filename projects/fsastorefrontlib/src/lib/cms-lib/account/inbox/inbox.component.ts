import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsComponentMapping,
  StandardCmsComponentConfig,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CmsInboxComponent } from './../../../occ-models/cms-component.models';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
  constructor(protected componentData: CmsComponentData<CmsInboxComponent>) { }

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

  ngOnInit() {
    this.componentData.data$.subscribe(data => this.tabs = data.tabComponents.split(' '));
  }
}
