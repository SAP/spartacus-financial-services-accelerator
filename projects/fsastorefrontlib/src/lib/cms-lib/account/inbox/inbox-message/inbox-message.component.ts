import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CmsComponentMapping, CmsService, StandardCmsComponentConfig } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { InboxService } from '../../../../my-account/assets/services/inbox.service';
import * as fromStore from '../../../../my-account/assets/store';
import { CmsInboxComponent } from './../../../../occ-models/cms-component.models';

export interface Mapping extends StandardCmsComponentConfig {
  CMSInboxTabComponent?: CmsComponentMapping;
}

@Component({
  selector: 'fsa-message-inbox',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxMessageComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService,
    protected inboxService: InboxService,
    protected store: Store<fromStore.UserState>
  ) {}

  component$: Observable<CmsInboxComponent>;
  messages$;
  opened = false;
  activeMessageGroup;

  ngOnInit() {
    this.loadGroup('');
    this.inboxService.activeMessageGroup.subscribe(
      messageGroup => { this.activeMessageGroup = messageGroup;
      this.loadGroup(this.activeMessageGroup);
      });
  }
  loadGroup(group: string) {
    this.inboxService.loadMessagesByMessageGroup(group);
    this.messages$ = this.store.pipe(select(fromStore.getMessages));
  }
}
