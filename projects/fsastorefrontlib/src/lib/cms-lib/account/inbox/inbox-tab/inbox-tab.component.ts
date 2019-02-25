import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsInboxTabComponent } from 'projects/fsastorefrontlib/src/lib/occ-models/cms-component.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxTabComponent implements OnInit {
  component$: Observable<any>;
  inboxTab;

  constructor(public component: CmsComponentData<CmsInboxTabComponent>) {}

  ngOnInit() {
    this.component$ = this.component.data$;
    this.component.data$.subscribe((data) => {
      this.inboxTab = data;
      console.log(this.inboxTab);
    });
  }
}
