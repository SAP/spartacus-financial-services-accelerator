import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromPremiumCalendar from '../reducers/premium-calendar.reducer';

export const getPremiumCalendarState: MemoizedSelector<
  any,
  fromPremiumCalendar.PremiumCalendarState
> = createSelector(
  fromFeature.getUserState,
  (premiumCalendarState: fromFeature.UserState) => premiumCalendarState.premiumCalendar
);

 export const getPremiumCalendar: MemoizedSelector<any, any> = createSelector(
   getPremiumCalendarState,
   fromPremiumCalendar.getPremiumCalendar
 );

export const  getPremiumCalendarRefresh: MemoizedSelector<any, boolean> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getRefresh
);

export const getPremiumCalendarLoaded: MemoizedSelector<any, boolean> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getLoaded
);

