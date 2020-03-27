import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CartDataService,
  CheckoutDeliveryService,
  CheckoutService,
} from '@spartacus/core';
import { CheckoutSelectors, FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<FSStateWithCheckout>,
    protected cartData: CartDataService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {
    super(fsStore, cartData);
  }

  orderPlaced: boolean;
  mockedDeliveryMode = 'financial-default';

  setIdentificationType(identificationType: string) {
    this.fsStore.dispatch(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: this.cartData.cartId,
        userId: this.cartData.userId,
      })
    );
    return this.fsStore.pipe(select(CheckoutSelectors.getIdentificationType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }
}
