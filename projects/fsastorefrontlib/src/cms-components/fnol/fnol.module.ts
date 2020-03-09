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
import { UserRequestService } from '../../core/user-request/facade/user-request.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../core/user-request/store/effects/index';
import { reducerProvider } from '../../core/user-request/store/reducers/index';
import { FNOLProgressBarComponent } from './fnol-progress-bar/fnol-progress-bar.component';
import { FNOLNavigationComponent } from './fnol-navigation/fnol-navigation.component';
import { FNOLConfirmationComponent } from './fnol-confirmation/fnol-confirmation.component';
import { UserRequestNavigationService } from '../../core/user-request/facade/user-request-navigation.service';
import { ClaimStoreModule } from '../../core/my-account/store/claim-store.module';
import { FNOLSummaryComponent } from './fnol-summary/fnol-summary.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { ClaimConfirmationGuard } from '../../core/user-request/guards/claim-confirmation-guard';
import { FSProgressBarModule } from '../progress-bar/progress-bar.module';

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
  {
    path: null,
    canActivate: [ClaimConfirmationGuard, AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolConfirmation',
      pageLabel: 'fnolConfirmationPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ClaimStoreModule,
    I18nModule,
    RouterModule,
    MediaModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    SpinnerModule,
    AccordionModule,
    FSProgressBarModule,
    EffectsModule.forFeature(effects),
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        UserRequestProgressBarFlex: {
          component: FNOLProgressBarComponent,
        },
        UserRequestSummaryFlex: {
          component: FNOLSummaryComponent,
        },
        UserRequestNavigationFlex: {
          component: FNOLNavigationComponent,
        },
        UserRequestConfirmationFlex: {
          component: FNOLConfirmationComponent,
        },
      },
    }),
  ],
  declarations: [
    FNOLProgressBarComponent,
    FNOLNavigationComponent,
    FNOLSummaryComponent,
    FNOLConfirmationComponent,
  ],
  exports: [
    FNOLProgressBarComponent,
    FNOLNavigationComponent,
    FNOLSummaryComponent,
    FNOLConfirmationComponent,
  ],
  entryComponents: [
    FNOLProgressBarComponent,
    FNOLNavigationComponent,
    FNOLSummaryComponent,
    FNOLConfirmationComponent,
  ],
  providers: [
    UserRequestService,
    reducerProvider,
    UserRequestNavigationService,
  ],
})
export class UserRequestModule {}
