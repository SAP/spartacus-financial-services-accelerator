import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { PremiumCalendarPageComponent } from './premium-calendar-page.component';
import { PremiumCalendarPageLayoutModule } from '../../layout/premium-calendar-page-layout/premium-calendar-page-layout.module';

const routes: Routes = [
  {
    path: 'my-account/premium-calendar',
    canActivate: [AuthGuard, CmsPageGuard],
    component: PremiumCalendarPageComponent,
    data: { pageLabel: 'premium-calendar' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    PremiumCalendarPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PremiumCalendarPageComponent],
  exports: [PremiumCalendarPageComponent]
})
export class PremiumCalendarPageModule { }
