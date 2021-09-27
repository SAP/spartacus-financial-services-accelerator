import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CheckoutActions, CHECKOUT_DETAILS } from '@spartacus/checkout/core';
import { AuthActions, StateUtils } from '@spartacus/core';
import { FSCheckoutState, FSCheckoutStepsState } from '../checkout-state';
import * as fromCartAction from './../actions/cart.action';
import * as fromCardTypes from './card-types.reducer';
import * as fromCheckout from './checkout.reducer';
import * as fromOrderTypes from './order-types.reducer';
import * as fromPaymentTypes from './payment-types.reducer';

export function getReducers(): ActionReducerMap<FSCheckoutState> {
  return {
    steps: StateUtils.loaderReducer<FSCheckoutStepsState>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    ),
    cardTypes: fromCardTypes.reducer,
    // TODO_UPGRADE: Address verification is removed
    paymentTypes: fromPaymentTypes.reducer,
    orderType: fromOrderTypes.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  FSCheckoutState
>> = new InjectionToken<ActionReducerMap<FSCheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearCheckoutState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === CheckoutActions.PLACE_ORDER ||
      action.type === fromCartAction.START_BUNDLE
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
