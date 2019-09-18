import { FSCheckoutStepsState } from '../fs-checkout-state';
import { FSCheckoutAction } from '../actions/fs-checkout.action';
import * as fromAction from '../actions';

export const initialState: FSCheckoutStepsState = {
    legalInformation: false,
    identificationType: false
};

export function reducer(
    state = initialState,
    action: FSCheckoutAction
): FSCheckoutStepsState {
    switch (action.type) {
        case fromAction.SET_IDENTIFICATION_TYPE_SUCCESS: {
            const identificationType = true;
            return {
                ...state,
                identificationType
            };
        }
        case fromAction.SET_IDENTIFICATION_TYPE_FAIL: {
            const identificationType = false;
            return {
                ...state,
                identificationType
            };
        }
    }
    return state;
}
