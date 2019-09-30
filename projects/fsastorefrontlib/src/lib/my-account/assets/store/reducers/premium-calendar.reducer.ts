import * as fromAction from './../actions';

export interface PremiumCalendarState {
  data: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: PremiumCalendarState = {
  data: {},
  refresh: false,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.PolicyAction
): PremiumCalendarState {
  switch (action.type) {
    case fromAction.LOAD_PREMIUM_CALENDAR_SUCCESS: {
      const data = { ...action.payload };
      return {
        ...state,
        data,
        refresh: false,
        loaded: true,
      };
    }
  }

  return state;
}

export const getPremiumCalendarData = (state: PremiumCalendarState) =>
  state.data;
export const getRefresh = (state: PremiumCalendarState) => state.refresh;
export const getLoaded = (state: PremiumCalendarState) => state.loaded;
