import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  ListNavigationModule,
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
import { InboxStoreModule } from '../../core/inbox/store/inbox-store.module';

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
    ListNavigationModule,
    InboxStoreModule,
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
})
export class InboxModule {}
