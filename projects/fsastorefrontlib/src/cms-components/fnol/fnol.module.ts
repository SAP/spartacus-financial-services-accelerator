import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
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
  MediaModule,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { MyAccountStoreModule } from '../../core/my-account/store/my-account-store.module';
import { UserRequestNavigationService } from '../../core/user-request/facade/user-request-navigation.service';
import { UserRequestService } from '../../core/user-request/facade/user-request.service';
import { ClaimConfirmationGuard } from '../../core/claim/guards/claim-confirmation-guard';
import { userRequestEffects } from '../../core/user-request/store/effects/index';
import { reducerProvider } from '../../core/user-request/store/reducers/index';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { FNOLConfirmationComponent } from './fnol-confirmation/fnol-confirmation.component';
import { FNOLNavigationComponent } from './fnol-navigation/fnol-navigation.component';
import { FNOLProgressBarComponent } from './fnol-progress-bar/fnol-progress-bar.component';
import { FNOLSummaryComponent } from './fnol-summary/fnol-summary.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimConfirmationGuard],
    data: {
      cxRoute: 'fnolIncidentPage',
      pageLabel: 'fnolIncidentPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimConfirmationGuard],
    data: {
      cxRoute: 'fnolIncidentReportPage',
      pageLabel: 'fnolIncidentReportPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimConfirmationGuard],
    data: {
      cxRoute: 'fnolGeneralInfoPage',
      pageLabel: 'fnolGeneralInfoPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimConfirmationGuard],
    data: {
      cxRoute: 'fnolSummaryPage',
      pageLabel: 'fnolSummaryPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'fnolConfirmationPage',
      pageLabel: 'fnolConfirmationPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MyAccountStoreModule,
    I18nModule,
    RouterModule,
    MediaModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    SpinnerModule,
    AccordionModule,
    ProgressBarModule,
    EffectsModule.forFeature(userRequestEffects),
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        FNOLProgressBarFlex: {
          component: FNOLProgressBarComponent,
        },
        FNOLSummaryFlex: {
          component: FNOLSummaryComponent,
        },
        FNOLNavigationFlex: {
          component: FNOLNavigationComponent,
        },
        FNOLConfirmationFlex: {
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
  providers: [
    UserRequestService,
    reducerProvider,
    UserRequestNavigationService,
  ],
})
export class FnolModule {}
