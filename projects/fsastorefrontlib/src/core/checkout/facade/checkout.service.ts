import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  RoutingService,
  UserIdService,
  StateWithProcess,
} from '@spartacus/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { combineLatest, Observable } from 'rxjs';
import { CheckoutSelectors, StateWithFSCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import { FSCart, FSOrderEntry, FSProduct } from '../../../occ/occ-models';
import { FSCheckoutConfigService } from '../services/checkout-config.service';
import {
  CheckoutDeliveryModesFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/order/root';
import { map } from 'rxjs/operators';
import { OccOrderAdapter } from '@spartacus/order/occ';

@Injectable()
export class FSCheckoutService {
  constructor(
    protected fsStore: Store<StateWithFSCheckout>,
    protected store: Store<CheckoutState>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected routingService: RoutingService,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected occOrderAdapter: OccOrderAdapter
  ) {}

  protected categoryBasedSteps = ['chooseCoverStep', 'comparisonCheckoutStep'];

  orderPlaced: boolean;
  mockedDeliveryMode = 'financial-default';

  setIdentificationType(
    activeCartCode: string,
    occUserId: string,
    identificationType: string
  ) {
    this.fsStore.dispatch(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: activeCartCode,
        userId: occUserId,
      })
    );
  }

  setLegalInformation() {
    this.fsStore.dispatch(
      new fromFSAction.SetLegalInformationSuccess({
        legalInformation: true,
      })
    );
  }
  setPaymentType(code: string) {
    this.fsStore.dispatch(
      new fromFSAction.SetPaymentTypeSuccess({
        code,
      })
    );
  }
  getLegalInformation(): Observable<boolean> {
    return this.fsStore.pipe(select(CheckoutSelectors.getLegalInformation));
  }

  getPaymentType(): Observable<string> {
    return this.fsStore.pipe(select(CheckoutSelectors.getPaymentType));
  }

  mockDeliveryMode() {
    this.checkoutDeliveryModesFacade.setDeliveryMode(this.mockedDeliveryMode);
  }

  filterRemoveableEntries(cart: FSCart | Order) {
    const cartEntries: FSOrderEntry[] = cart?.deliveryOrderGroups[0]?.entries;
    if (cartEntries?.length > 0) {
      return cartEntries.filter(item => item.removeable);
    }
  }

  startCheckoutForProduct(product: FSProduct) {
    let routingParam;
    const initialStep = this.checkoutConfigService.getInitialStepForCategory(
      product.defaultCategory.code
    );
    if (this.categoryBasedSteps.includes(initialStep.id)) {
      routingParam = product.defaultCategory.code;
    } else {
      routingParam = product.code;
    }
    this.routingService.go({
      cxRoute: initialStep.routeName,
      params: { code: routingParam },
    });
  }

  placeOrder(termsChecked: boolean) {
    combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      map(([userId, cartId]) => {
        this.occOrderAdapter.placeOrder(userId, cartId, termsChecked);
      })
    );
  }
}
