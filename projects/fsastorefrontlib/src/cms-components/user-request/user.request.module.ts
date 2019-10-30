import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  MediaModule,
  PageComponentModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { UserRequestDataService } from '../../lib/my-account/assets/services';
import { OccUserRequestService } from '../../occ/services/user-request/user-request.service';
import { UserRequestNavigationComponent } from './user-request-navigation/user-request-navigation.component';
import { UserRequestProgressBarComponent } from './user-request-progress-bar/user-request-progress-bar.component';
import { UserRequestSummaryComponent } from './user-request-summary/user-request-summary.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolIncident',
      pageLabel: 'fnolIncidentPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    I18nModule,
    RouterModule,
    UrlModule,
    MediaModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserRequestProgressBarFlex: {
          component: UserRequestProgressBarComponent,
        },
        UserRequestSummaryFlex: {
          component: UserRequestSummaryComponent,
        },
        UserRequestNavigationFlex: {
          component: UserRequestNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
  exports: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
  entryComponents: [
    UserRequestProgressBarComponent,
    UserRequestSummaryComponent,
    UserRequestNavigationComponent,
  ],
  providers: [OccUserRequestService, UserRequestDataService],
})
export class UserRequestModule {}
