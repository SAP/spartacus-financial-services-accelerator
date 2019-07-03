import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { AuthGuard, I18nModule, ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';
import { AccordionModule } from './../../accordion/accordion.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'policyDetails',
      pageLabel: 'policy-details'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    I18nModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        AccountPolicyDetailsSPAComponent: {
          component: PolicyDetailsComponent
        }
      },
      routing: {
        routes: {
          policyDetails: {
            paths: [
              'my-account/my-policies/:policyId/:contractId'
            ]
          }
        }
      }
    })
  ],
  declarations: [ PolicyDetailsComponent ],
  exports: [ PolicyDetailsComponent ],
  entryComponents: [ PolicyDetailsComponent ]
})
export class PolicyDetailsModule { }
