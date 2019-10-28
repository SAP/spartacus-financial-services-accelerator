import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  AuthGuard,
  UrlModule,
} from '@spartacus/core';
import {
  MediaModule,
  CmsPageGuard,
  PageLayoutComponent,
  PageComponentModule,
} from '@spartacus/storefront';
import { UserRequestProgressBarComponent } from './user-request-progress-bar/user-request-progress-bar.component';
import { UserRequestSummaryComponent } from './user-request-summary/user-request-summary.component';
import { UserRequestNavigationComponent } from './user-request-navigation/user-request-navigation.component';
import { OccUserRequestService } from '../occ/user-request/user-request.service';
import {
  UserRequestDataService,
  UserRequestService,
} from '../my-account/assets/services';
import { FormsModule } from '@angular/forms';

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
  providers: [
    OccUserRequestService,
    UserRequestService,
    UserRequestDataService,
  ],
})
export class UserRequestModule {}
