import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  CartDataService,
  CheckoutService,
  StateWithCheckout,
  CheckoutDeliveryService,
  Address,
} from '@spartacus/core';
import * as fromFSAction from '../store/actions/index';
import { FSStateWithCheckout, FSCheckoutSelectors } from '../store';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<FSStateWithCheckout>,
    protected store: Store<StateWithCheckout>,
    protected cartData: CartDataService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {
    super(store, cartData);
  }

  mockedDeliveryMode = 'financial-default';

  mockedDeliveryAddress: Address = {
    id: 'testID',
    country: { isocode: 'GB' },
    firstName: 'Donna',
    lastName: 'Moore',
    town: 'London',
    line1: 'line1',
    postalCode: 'WC1V 6PL',
  };

  setIdentificationType(identificationType: string) {
    this.fsStore.dispatch(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: this.cartData.cartId,
        userId: this.cartData.userId,
      })
    );
    return this.fsStore.pipe(select(FSCheckoutSelectors.getIdentificationType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }

  mockDeliveryAddress() {
    this.checkoutDeliveryService.createAndSetAddress(
      this.mockedDeliveryAddress
    );
  }
}
