import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent, SpinnerModule } from '@spartacus/storefront';
import { CmsConfig, ConfigModule, AuthGuard, I18nModule } from '@spartacus/core';
import { PremiumCalendarComponent } from './components/premium-calendar/premium-calendar.component';

const routes: Routes = [
  {
    path: 'my-account/premium-calendar',
    canActivate: [AuthGuard, CmsPageGuard],
    data: { pageLabel: 'premium-calendar' },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountPremiumCalendarSPAComponent: { selector: 'fsa-premium-calendar' }
      }
    })
  ],
  declarations: [ PremiumCalendarComponent ],
  exports: [ PremiumCalendarComponent ],
  entryComponents: [ PremiumCalendarComponent ]
})
export class PremiumCalendarModule { }
