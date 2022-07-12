import { NgModule } from '@angular/core';
import { BillingEventValuePipe } from './billing-event-value.pipe';
import { BankingEntryValuePipe } from './banking-entry-value.pipe';

@NgModule({
  declarations: [BankingEntryValuePipe, BillingEventValuePipe],
  exports: [BankingEntryValuePipe, BillingEventValuePipe],
})
export class ContextValueModule {}
