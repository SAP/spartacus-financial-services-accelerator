import * as fromAction from '../actions';
import { ConsentState } from '../my-account-state';

export const initialState: ConsentState = {
  consents: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.ConsentAction
): ConsentState {
  switch (action.type) {
    case fromAction.LOAD_CONSENTS_SUCCESS: {
      const consents = { ...action.payload };
      return {
        ...state,
        consents,
        loaded: true,
      };
    }
  }
  return state;
}

export const getConsents = (state: ConsentState) => state.consents;
export const getLoaded = (state: ConsentState) => state.loaded;
