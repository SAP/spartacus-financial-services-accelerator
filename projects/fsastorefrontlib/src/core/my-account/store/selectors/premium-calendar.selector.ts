import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPremiumCalendar from '../reducers/premium-calendar.reducer';

export const getPremiumCalendarState: MemoizedSelector<
  any,
  fromPremiumCalendar.PremiumCalendarState
> = createSelector(
  fromFeature.getUserState,
  (userState: fromFeature.UserState) => userState.premiumCalendar
);

export const getPremiumCalendarData: MemoizedSelector<
  any,
  any
> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getPremiumCalendarData
);

export const getPremiumCalendarRefresh: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getRefresh
);

export const getPremiumCalendarLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getLoaded
);
