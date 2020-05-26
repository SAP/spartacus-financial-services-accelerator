import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CheckoutDeliveryService,
  CheckoutService,
  ActiveCartService,
  AuthService,
} from '@spartacus/core';
import { CheckoutSelectors, FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<FSStateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {
    super(fsStore, authService, activeCartService);
  }

  orderPlaced: boolean;
  mockedDeliveryMode = 'financial-default';

  setIdentificationType(identificationType: string) {
    this.fsStore.dispatch(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: this.activeCartService.getActiveCartId,
        userId: this.authService.getOccUserId,
      })
    );
    return this.fsStore.pipe(select(CheckoutSelectors.getIdentificationType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }
}
