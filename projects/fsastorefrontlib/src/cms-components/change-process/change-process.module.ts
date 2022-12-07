import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
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
  PageLayoutComponent,
} from '@spartacus/storefront';
import { DateFormatConfigurationModule } from '../../shared/util/helpers/pipe/dateFormatConfiguration.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { ChangeRequestSubmissionGuard } from './../../core/change-request/guards/change-request-submission.guard';
import { AbstractChangeProcessStepComponent } from './abstract-change-process-step/abstract-change-process-step.component';
import { ChangeCarDetailsNavigationComponent } from './change-car-details-navigation/change-car-details-navigation.component';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ChangeProcessConfirmationComponent } from './change-process-confirmation/change-process-confirmation.component';
import { ChangeProcessProgressBarComponent } from './change-process-progress-bar/change-process-progress-bar.component';
import { ChangeSimulationComponent } from './change-simulation/change-simulation.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ChangeRequestSubmissionGuard],
    data: {
      cxRoute: 'changeCarDetailsPage',
      pageLabel: 'changeCarDetailsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ChangeRequestSubmissionGuard],
    data: {
      cxRoute: 'changeCoveragePage',
      pageLabel: 'changeCoveragePage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ChangeRequestSubmissionGuard],
    data: {
      cxRoute: 'changeSimulationPage',
      pageLabel: 'changeSimulationPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeAdditionalDriverPage',
      pageLabel: 'changeAdditionalDriverPage',
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
        MediaModule,
        NgbTooltipModule,
        ProgressBarModule,
        DateFormatConfigurationModule,
        RouterModule.forChild(routes),
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                ChangeRequestProgressBarFlex: {
                    component: ChangeProcessProgressBarComponent,
                },
                ChangeCoverageFlex: {
                    component: ChangeCoverageComponent,
                },
                ChangeCarDetailsNavigationFlex: {
                    component: ChangeCarDetailsNavigationComponent,
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
        ChangeCarDetailsNavigationComponent,
        AbstractChangeProcessStepComponent,
        ChangeProcessConfirmationComponent,
    ],
    exports: [
        ChangeCoverageComponent,
        ChangeSimulationComponent,
        ChangeProcessProgressBarComponent,
        ChangeCarDetailsNavigationComponent,
        AbstractChangeProcessStepComponent,
        ChangeProcessConfirmationComponent,
    ],
    providers: [DatePipe]
})
export class ChangeProcessModule {}
