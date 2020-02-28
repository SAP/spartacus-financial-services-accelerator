import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOverviewModule } from './customer-overview/customer-overview.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardModule,
        CustomerOverviewModule
    ],
    declarations: [

    ],
    exports: [

    ],
    entryComponents: [

    ],
    providers: [],
})
export class AgentPortalModule { }