import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';

import { InboxMessagesComponent } from './inbox-tab/inbox-messages/inbox-messages.component';
import { InboxTabComponent } from './inbox-tab/inbox-tab.component';
import { InboxComponent } from './inbox.component';
import { OccInboxService } from '../../occ/services/inbox/inbox.service';
import { InboxDataService } from '../../core/myaccount/services/inbox-data.service';
import { InboxService } from '../../core/myaccount/services/inbox.service';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'inbox',
      pageLabel: 'inbox',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    NgSelectModule,
    SpinnerModule,
    CmsModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        CMSInboxComponent: {
          component: InboxComponent,
        },
      },
    }),
  ],
  declarations: [InboxComponent, InboxTabComponent, InboxMessagesComponent],
  exports: [InboxComponent, InboxTabComponent, InboxMessagesComponent],
  entryComponents: [InboxComponent, InboxTabComponent],
  providers: [OccInboxService, InboxDataService, InboxService],
})
export class InboxModule {}
