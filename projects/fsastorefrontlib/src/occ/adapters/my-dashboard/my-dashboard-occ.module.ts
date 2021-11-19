import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { MyDashboardConnector } from '../../../core/my-dashboard/connectors';
import { OccMyDashboardAdapter } from './occ-my-dashboard.adapter';
import { defaultOccMyDashboardConfig } from './default-occ-my-dashboard-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: MyDashboardConnector,
      useClass: OccMyDashboardAdapter,
    },
    provideConfig(defaultOccMyDashboardConfig),
  ],
})
export class MyDashboardOccModule {}
