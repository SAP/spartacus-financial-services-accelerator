import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  CartDataService,
  CheckoutService,
  StateWithCheckout,
} from '@spartacus/core';
import * as fromFSAction from '../store/actions/index';
import { FSStateWithCheckout, FSCheckoutSelectors } from '../store';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<FSStateWithCheckout>,
    protected store: Store<StateWithCheckout>,
    protected cartData: CartDataService
  ) {
    super(store, cartData);
  }

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
}
