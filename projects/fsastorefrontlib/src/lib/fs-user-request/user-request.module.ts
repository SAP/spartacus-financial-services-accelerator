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
import { UserRequestService } from './assets/services/user-request/user-request.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './assets/store/effects/index';
import { OccUserRequestService } from '../occ/claim/user-request.service';
import { reducerToken, reducerProvider } from './assets/store/reducers/index';
import { StoreModule } from '@ngrx/store';
import { UserRequestProgressBarComponent } from './assets/components/user-request-progress-bar/user-request-progress-bar.component';
import { UserRequestDataService } from './assets/services/user-request-data.service';
import { UserRequestNavigationComponent } from './assets/components/user-request-navigation/user-request-navigation.component';
import { UserRequestNavigationService } from './assets/services/user-request/user-request-navigation.service';
import { UserRequestStoreModule } from './assets/store/user-request-store.module';

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
        UserRequestNavigationFlex: {
          component: UserRequestNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    UserRequestProgressBarComponent,
    UserRequestNavigationComponent,
  ],
  exports: [UserRequestProgressBarComponent, UserRequestNavigationComponent],
  entryComponents: [
    UserRequestProgressBarComponent,
    UserRequestNavigationComponent,
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
