import { Action } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { CHECKOUT_DETAILS } from '../checkout-state';

export const SET_IDENTIFICATION_TYPE = '[FSCheckout] Set Identification Type';
export const SET_IDENTIFICATION_TYPE_SUCCESS =
  '[FSCheckout] Set Identification Type Success';
export const SET_IDENTIFICATION_TYPE_FAIL =
  '[FSCheckout] Set Identification Type Fail';
export const SET_LEGAL_INFORMATION_SUCCESS =
  '[FSCheckout] Set Legal Information Success';
export const SET_PAYMENT_TYPE_SUCCESS = '[FSCheckout] Set Payment Type Success';
export const LOAD_CHECKOUT_DETAILS = '[Checkout] Load Checkout Details';

export class SetIdentificationType implements Action {
  readonly type = SET_IDENTIFICATION_TYPE;
  constructor(public payload: any) {}
}

export class SetIdentificationTypeSuccess implements Action {
  readonly type = SET_IDENTIFICATION_TYPE_SUCCESS;
  constructor(public payload: any) {}
}

export class SetIdentificationTypeFail implements Action {
  readonly type = SET_IDENTIFICATION_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class SetLegalInformationSuccess implements Action {
  readonly type = SET_LEGAL_INFORMATION_SUCCESS;
  constructor(public payload: any) {}
}

export class SetPaymentTypeSuccess implements Action {
  readonly type = SET_PAYMENT_TYPE_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCheckoutDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_DETAILS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CHECKOUT_DETAILS);
  }
}

export type CheckoutAction =
  | SetIdentificationType
  | SetIdentificationTypeSuccess
  | SetIdentificationTypeFail
  | SetLegalInformationSuccess
  | SetPaymentTypeSuccess
  | LoadCheckoutDetails;
