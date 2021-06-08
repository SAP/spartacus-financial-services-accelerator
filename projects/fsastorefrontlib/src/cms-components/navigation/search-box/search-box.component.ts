import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Optional } from '@angular/core';
import {
  CmsSearchBoxComponent,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CmsComponentData,
  SearchBoxComponent,
  SearchBoxComponentService,
} from '@spartacus/storefront';
import { FSCheckoutService } from '../../../core/checkout/facade/checkout.service';
import { FSProduct } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-search-box',
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSSearchBoxComponent extends SearchBoxComponent {
  constructor(
    protected searchBoxComponentService: SearchBoxComponentService,
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    protected winRef: WindowRef,
    protected checkoutService: FSCheckoutService,
    protected routingService: RoutingService
  ) {
    super(searchBoxComponentService, componentData, winRef);
  }

  startCheckout(product: FSProduct) {
    this.checkoutService.startCheckoutForProduct(product);
  }
}
