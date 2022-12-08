export const FS_CHECKOUT_FEATURE = 'fscheckout';
export const CHECKOUT_DETAILS = '[Checkout] Checkout Details';

export interface StateWithFSCheckout {
  [FS_CHECKOUT_FEATURE]: FSCheckoutState;
}

export interface FSCheckoutState {
  fscheckout: FSCheckoutDataState;
}

export interface FSCheckoutDataState {
  legalInformation: boolean;
  identificationType: boolean;
  paymentType: string;
}
