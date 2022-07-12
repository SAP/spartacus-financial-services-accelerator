import * as fromAction from '../actions';
import { PremiumCalendarState } from '../my-account-state';

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const initialState: PremiumCalendarState = {
  data: {},
  loaded: false,
};

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export function reducer(
  state = initialState,
  action: fromAction.PolicyAction
): PremiumCalendarState {
  if (action.type === fromAction.LOAD_PREMIUM_CALENDAR_SUCCESS) {
    const data = { ...action.payload };
    return {
      ...state,
      data,
      loaded: true,
    };
  }
  return state;
}
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getPremiumCalendarData = (state: PremiumCalendarState) =>
  state.data;
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getLoaded = (state: PremiumCalendarState) => state.loaded;
