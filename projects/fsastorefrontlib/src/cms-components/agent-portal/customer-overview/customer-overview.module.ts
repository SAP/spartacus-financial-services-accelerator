import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CustomerQuotesComponent } from './quotes/customer-quotes.component';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent, SpinnerModule } from '@spartacus/storefront';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CustomerPoliciesComponent } from './policies/customer-policies.component';
import { TableModule, LayoutGridModule, InputGroupModule, PanelModule, FormModule } from '@fundamental-ngx/core';
import { CustomerPremiumCalendarComponent } from './premium-calendar/customer-premium-calendar.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'customerOverview',
      pageLabel: 'customer-overview',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  declarations: [DetailsComponent, CustomerPoliciesComponent, CustomerQuotesComponent, CustomerPremiumCalendarComponent],
  exports: [DetailsComponent, CustomerPoliciesComponent, CustomerQuotesComponent, CustomerPremiumCalendarComponent],
  entryComponents: [DetailsComponent, CustomerPoliciesComponent, CustomerQuotesComponent, CustomerPremiumCalendarComponent],
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,

    TableModule,
    LayoutGridModule,
    InputGroupModule,
    PanelModule,
    FormModule,

    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CustomerDetailsFlex: {
          component: DetailsComponent,
        },
        CustomerQuotesFlex: {
          component: CustomerQuotesComponent,
        },
        CustomerPoliciesFlex: {
          component: CustomerPoliciesComponent,
        },
        // CustomerClaimsFlexComponent: {
        //   component: BookOfBussinesComponent,
        // },
        CustomerPremiumCalendarFlex: {
          component: CustomerPremiumCalendarComponent,
        },
      },
    })
  ]
})
export class CustomerOverviewModule { }
