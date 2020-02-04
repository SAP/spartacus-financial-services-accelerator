import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ConfigModule, CmsConfig, AuthGuard } from '@spartacus/core';
import { ChangeSimulationComponent } from './change-simulation/change-simulation.component';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

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
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ChangeCoverageFlex: {
          component: ChangeCoverageComponent,
        },
        ChangeSimulationFlex: {
          component: ChangeSimulationComponent,
        },
      },
    }),
  ],
  declarations: [ChangeCoverageComponent, ChangeSimulationComponent],
  exports: [ChangeCoverageComponent, ChangeSimulationComponent],
  entryComponents: [ChangeCoverageComponent, ChangeSimulationComponent],
})
export class ChangeProcessModule {}
