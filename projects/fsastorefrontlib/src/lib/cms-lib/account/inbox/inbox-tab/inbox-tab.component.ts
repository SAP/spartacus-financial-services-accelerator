import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsInboxTabComponent } from 'projects/fsastorefrontlib/src/lib/occ-models/cms-component.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxTabComponent implements OnInit {
  inboxTab: Observable<CmsInboxTabComponent>;

  constructor(public component: CmsComponentData<CmsInboxTabComponent>) {}

  ngOnInit() {}

  getData(): Observable<CmsInboxTabComponent> {
    return this.component.data$.pipe(
      map(data => {
        return data;
      })
    );
  }
}
