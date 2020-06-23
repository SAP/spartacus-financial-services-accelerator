import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  AuthService,
  CheckoutDeliveryService,
  CheckoutService,
} from '@spartacus/core';
import { combineLatest } from 'rxjs';
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
    combineLatest([
      this.activeCartService.getActiveCartId(),
      this.authService.getOccUserId(),
    ])
      .subscribe(([activeCartCode, occUserId]) => {
        if (activeCartCode && occUserId) {
          this.fsStore.dispatch(
            new fromFSAction.SetIdentificationType({
              identificationType: identificationType,
              cartId: activeCartCode,
              userId: occUserId,
            })
          );
        }
      })
      .unsubscribe();
    return this.fsStore.pipe(select(CheckoutSelectors.getIdentificationType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }
}
