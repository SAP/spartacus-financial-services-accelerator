import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { reducerToken } from '../../core/change-request/store/reducers/index';
import { ChangeCarDetailsFormComponent } from './change-carDetails/change-car-details-form.component';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ChangeProcessNavigationComponent } from './change-process-navigation/change-process-navigation.component';
import { ChangeProcessProgressBarComponent } from './change-process-progress-bar/change-process-progress-bar.component';
import { ChangeSimulationComponent } from './change-simulation/change-simulation.component';
const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeCarDetailsPage',
      pageLabel: 'changeCarDetailsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeCoveragePage',
      pageLabel: 'changeCoveragePage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeSimulationPage',
      pageLabel: 'changeSimulationPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    NgSelectModule,
    ReactiveFormsModule,
    UrlModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('changeRequests', reducerToken),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ChangeRequestProgressBarFlex: {
          component: ChangeProcessProgressBarComponent,
        },
        ChangeCoverageFlex: {
          component: ChangeCoverageComponent,
        },
        ChangeCarDetailsFlex: {
          component: ChangeCarDetailsFormComponent,
        },
        ChangeSimulationFlex: {
          component: ChangeSimulationComponent,
        },
        ChangeRequestNavigationFlex: {
          component: ChangeProcessNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    ChangeProcessNavigationComponent,
  ],
  exports: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    ChangeProcessNavigationComponent,
  ],
  entryComponents: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    ChangeProcessNavigationComponent,
  ],
  providers: [DatePipe],
})
export class ChangeProcessModule {}
