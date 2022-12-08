import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  RoutingService,
  UserIdService,
  StateWithProcess,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { Observable } from 'rxjs';
import { CheckoutSelectors, StateWithFSCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import { FSCart, FSOrderEntry, FSProduct } from '../../../occ/occ-models';
import { FSCheckoutConfigService } from '../services/checkout-config.service';
import {
  CheckoutDeliveryService,
  CheckoutService,
  StateWithCheckout,
} from '@spartacus/checkout/core';

@Injectable()
export class FSCheckoutService extends CheckoutService {
  constructor(
    protected fsStore: Store<StateWithFSCheckout>,
    protected store: Store<StateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected routingService: RoutingService,
    protected processStateStore: Store<StateWithProcess<void>>
  ) {
    super(store, processStateStore, activeCartService, userIdService);
  }
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
    this.checkoutDeliveryService.setDeliveryMode(this.mockedDeliveryMode);
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
}
