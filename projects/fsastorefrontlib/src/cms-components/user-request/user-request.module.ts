import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  SpinnerModule,
  MediaModule,
} from '@spartacus/storefront';
import { UserRequestService } from '../../core/user-request/services/user-request/user-request.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../core/user-request/store/effects/index';
import { reducerToken, reducerProvider } from '../../core/user-request/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { UserRequestProgressBarComponent } from './user-request-progress-bar/user-request-progress-bar.component';
import { UserRequestDataService } from '../../core/user-request/services/user-request-data.service';
import { UserRequestNavigationComponent } from './user-request-navigation/user-request-navigation.component';
import { UserRequestNavigationService } from '../../core/user-request/services/user-request/user-request-navigation.service';
import { UserRequestStoreModule } from '../../core/user-request/store/user-request-store.module';
import { UserRequestSummaryComponent } from './user-request-summary/user-request-summary.component';
import { OccUserRequestService } from '../../occ/services/user-request/user-request.service';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolIncidentPage',
      pageLabel: 'fnolIncidentPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolIncidentReportPage',
      pageLabel: 'fnolIncidentReportPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolGeneralInfoPage',
      pageLabel: 'fnolGeneralInfoPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolSummaryPage',
      pageLabel: 'fnolSummaryPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    UserRequestStoreModule,
    I18nModule,
    RouterModule,
    MediaModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    SpinnerModule,
    EffectsModule.forFeature(effects),
    RouterModule.forChild(routes),
    StoreModule.forFeature('userRequest', reducerToken),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
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
    UserRequestNavigationComponent,
    UserRequestSummaryComponent,
  ],
  exports: [
    UserRequestProgressBarComponent,
    UserRequestNavigationComponent,
    UserRequestSummaryComponent,
  ],
  entryComponents: [
    UserRequestProgressBarComponent,
    UserRequestNavigationComponent,
    UserRequestSummaryComponent,
  ],
  providers: [
    UserRequestService,
    OccUserRequestService,
    reducerProvider,
    UserRequestDataService,
    UserRequestNavigationService,
  ],
})
export class UserRequestModule {}
