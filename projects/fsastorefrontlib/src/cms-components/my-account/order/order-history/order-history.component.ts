import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrderHistoryComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSOrderHistoryComponent extends OrderHistoryComponent {}
