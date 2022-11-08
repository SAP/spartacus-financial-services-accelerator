import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CustomerDashboardComponent } from './customer-dashboard.component';

@NgModule({
  imports: [I18nModule, CommonModule],
  exports: [CustomerDashboardComponent],
  declarations: [CustomerDashboardComponent],
  providers: [],
})
export class CustomerDashboardModule {}
