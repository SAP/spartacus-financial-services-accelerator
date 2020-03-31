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
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { AbstractChangeProcessStepComponent } from './abstract-change-process-step/abstract-change-process-step.component';
import { ChangeCarDetailsFormComponent } from './change-car-details-form/change-car-details-form.component';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ChangeProcessConfirmationComponent } from './change-process-confirmation/change-process-confirmation.component';
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
    ProgressBarModule,
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
        ChangeRequestConfirmationFlex: {
          component: ChangeProcessConfirmationComponent,
        },
      },
    }),
  ],
  declarations: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    AbstractChangeProcessStepComponent,
    ChangeProcessConfirmationComponent,
  ],
  exports: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    AbstractChangeProcessStepComponent,
    ChangeProcessConfirmationComponent,
  ],
  entryComponents: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsFormComponent,
    AbstractChangeProcessStepComponent,
    ChangeProcessConfirmationComponent,
  ],
  providers: [DatePipe],
})
export class ChangeProcessModule {}
