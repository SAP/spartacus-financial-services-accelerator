import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CmsComponentData } from '@spartacus/storefront';
import { InboxService } from 'projects/fsastorefrontlib/src/lib/my-account/assets/services/inbox.service';
import { CmsInboxTabComponent } from 'projects/fsastorefrontlib/src/lib/occ-models/cms-component.models';
import * as fromStore from '../../../../my-account/assets/store';
import { EventEmitter } from '@angular/core';
import { CmsService } from '@spartacus/core';



@Component({
  selector: 'fsa-inbox-tab',
  templateUrl: './inbox-tab.component.html',
  styleUrls: ['./inbox-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxTabComponent implements OnInit {
  @Output() tabsSelected = new EventEmitter();
  component$;
  messages$;
  deda;
  componentUid;

  constructor(
    public componentData: CmsComponentData<CmsInboxTabComponent>,
    public inboxService: InboxService,
    protected store: Store<fromStore.UserState>,
    private cmsService: CmsService,
    ) {}

    ngOnInit() {
      this.component$ = this.cmsService.getComponentData('AutoInboxTabComponent');
      console.log(this.component$);
    }
    onTabClicked() {
      this.deda = this.componentData.contextParameters;
    }
}
