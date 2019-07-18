import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard, SpinnerModule, PageLayoutComponent } from '@spartacus/storefront';
import { AuthGuard, I18nModule, ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { PremiumCalendarComponent } from './components/premium-calendar/premium-calendar.component';

const routes: Routes = [
  {
    path: null, // can be null only if pathS property is defined in ConfigModule
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'premiumCalendar', // custom name for your route to be used in ConfigModule configuration
      pageLabel: 'premium-calendar'// ContentPage that is inserted into ContentSlot/ContentSlotForPage in impex file
    },
    component: PageLayoutComponent // SPA LAYOUT Component you're targeting
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        AccountPremiumCalendarSPAComponent: { // mapping hybris component (defined in impex)
          component: PremiumCalendarComponent // to SPA component
        }
      },
      routing: {
        routes: {
          premiumCalendar: { // name from cxRoute property above
            paths: [ // replaces the null property from Routes object
              'my-account/premium-calendar'
            ]
          }
        }
      }
    })
  ],
  declarations: [ PremiumCalendarComponent ],
  exports: [ PremiumCalendarComponent ],
  entryComponents: [ PremiumCalendarComponent ]
})
export class PremiumCalendarModule { }
