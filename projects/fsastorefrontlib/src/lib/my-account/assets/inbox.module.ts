import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { AuthGuard, I18nModule } from '@spartacus/core';

import { InboxMessagesComponent } from '../../cms-lib/account/inbox/inbox-tab/inbox-messages/inbox-messages.component';
import { InboxTabComponent } from '../../cms-lib/account/inbox/inbox-tab/inbox-tab.component';
import { InboxComponent } from '../../cms-lib/account/inbox/inbox.component';
import { OccInboxService } from '../../occ/inbox/inbox.service';
import { InboxDataService } from './services/inbox-data.service';
import { InboxService } from './services/inbox.service';

const routes: Routes = [
  {
    path: 'my-account/inbox',
    canActivate: [AuthGuard, CmsPageGuard],
    data: { pageLabel: 'inbox' },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    ComponentsModule,
    CmsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ InboxComponent, InboxTabComponent, InboxMessagesComponent ],
  exports: [ InboxComponent, InboxTabComponent, InboxMessagesComponent ],
  entryComponents: [ InboxComponent, InboxTabComponent, InboxMessagesComponent ],
  providers: [ InboxService, InboxDataService, OccInboxService ]
})
export class InboxModule {}
