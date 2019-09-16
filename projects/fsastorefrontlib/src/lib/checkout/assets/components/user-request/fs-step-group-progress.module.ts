import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  I18nModule,
  UrlModule,
  AuthGuard,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig
} from '@spartacus/core';
import { FSStepGroupProgressComponent } from './fs-step-group-progress.component';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'userRequest',
      pageLabel: 'user-request'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        StepGroupBarFlex: {
          component: FSStepGroupProgressComponent,
          guards: [AuthGuard]
        }
      }
    })
  ],
  declarations: [FSStepGroupProgressComponent],
  entryComponents: [FSStepGroupProgressComponent],
  exports: [FSStepGroupProgressComponent]
})
export class FSStepGroupProgressModule {}
