import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsService, StandardCmsComponentConfig, CmsComponentMapping } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CmsInboxComponent } from './../../../occ-models/cms-component.models';

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
    protected cmsService: CmsService
  ) {}

  component$: Observable<CmsInboxComponent>;
  inboxTabs$: Observable<any>;
  tabs;

  ngOnInit() {
    this.component$ = this.componentData.data$;

    this.loadInboxTabs();
  }

  loadInboxTabs() {
    this.component$.subscribe(data => {
      this.tabs = data.tabComponents.split(' ');
    });
  }
}
