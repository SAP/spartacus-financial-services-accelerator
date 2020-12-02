import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  RoutingService,
  TranslationService,
  UserOrderService,
  UserReplenishmentOrderService,
} from '@spartacus/core';
import { OrderHistoryComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-history',
  templateUrl: './order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSOrderHistoryComponent extends OrderHistoryComponent {
  constructor(
    protected routing: RoutingService,
    protected userOrderService: UserOrderService,
    protected translation: TranslationService,
    protected userReplenishmentOrderService: UserReplenishmentOrderService
  ) {
    super(
      routing,
      userOrderService,
      translation,
      userReplenishmentOrderService
    );
  }
}
