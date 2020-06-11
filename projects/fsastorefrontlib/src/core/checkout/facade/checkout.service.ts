import { combineLatest } from 'rxjs';
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
import { tap } from 'rxjs/operators';

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
      .pipe(
        tap(([cartId, userId]: [string, string]) => {
          this.fsStore.dispatch(
            new fromFSAction.SetIdentificationType({
              identificationType: identificationType,
              cartId: cartId,
              userId: userId,
            })
          );
        })
      )
      .subscribe();

    return this.fsStore.pipe(select(CheckoutSelectors.getIdentificationType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
  }
}
