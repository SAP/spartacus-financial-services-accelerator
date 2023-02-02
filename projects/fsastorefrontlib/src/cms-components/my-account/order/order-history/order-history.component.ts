import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderHistoryComponent } from '@spartacus/order/components';

@Component({
  selector: 'cx-fs-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSOrderHistoryComponent extends OrderHistoryComponent {}
