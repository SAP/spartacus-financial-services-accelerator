import { NgModule } from '@angular/core';
import { FSOrderDetailsModule } from './order-details/order-details.module';
import { FSOrderHistoryModule } from './order-history/order-history.module';

@NgModule({
  imports: [FSOrderHistoryModule, FSOrderDetailsModule],
})
export class FSOrderModule {}
