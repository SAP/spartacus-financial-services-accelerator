import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { FSCheckoutState } from '../checkout-state';
import * as fromCheckoutReducer from './checkout.reducer';
import * as fromCartAction from './../actions/cart.action';

export function getReducers(): ActionReducerMap<FSCheckoutState> {
  return {
    fscheckout: fromCheckoutReducer.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<FSCheckoutState>> =
  new InjectionToken<ActionReducerMap<FSCheckoutState>>('FSCheckoutReducers');

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
      // TODO:Spartacus Upgrade action.type === CheckoutActions.PLACE_ORDER ||
      action.type === fromCartAction.START_BUNDLE
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
