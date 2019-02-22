import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsInboxTabComponent } from 'projects/fsastorefrontlib/src/lib/occ-models/cms-component.models';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxTabComponent implements OnInit {
  inboxTab;

  constructor(public component: CmsComponentData<CmsInboxTabComponent>) {}

  ngOnInit() {
    this.inboxTab = this.component.data$.subscribe(data => this.inboxTab = data);
  }
}
