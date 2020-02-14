import * as fromAction from '../actions';

export interface PremiumCalendarState {
  data: {};
  loaded: boolean;
}

export const initialState: PremiumCalendarState = {
  data: {},
  loaded: false,
};

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

export const getPremiumCalendarData = (state: PremiumCalendarState) =>
  state.data;
export const getLoaded = (state: PremiumCalendarState) => state.loaded;
