import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CmsComponentData } from '@spartacus/storefront';
import { InboxService } from 'projects/fsastorefrontlib/src/lib/my-account/assets/services/inbox.service';
import { CmsInboxTabComponent } from 'projects/fsastorefrontlib/src/lib/occ-models/cms-component.models';
import * as fromStore from '../../../../my-account/assets/store';



@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxTabComponent implements OnInit {

  component$;
  messages$;

  constructor(public component: CmsComponentData<CmsInboxTabComponent>,
    public inboxService: InboxService,
    protected store: Store<fromStore.UserState>
    ) {}

    ngOnInit() {
      this.component$ = this.component.data$;
    }
}
