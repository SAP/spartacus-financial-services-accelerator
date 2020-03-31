import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromPremiumCalendar from '../reducers/premium-calendar.reducer';
import {
  MyAccountState,
  PremiumCalendarState,
  StateWithMyAccount,
} from '../my-account-state';

export const getPremiumCalendarState: MemoizedSelector<
  StateWithMyAccount,
  PremiumCalendarState
> = createSelector(
  fromFeature.getUserState,
  (myAccountState: MyAccountState) => myAccountState.premiumCalendar
);

export const getPremiumCalendarData: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getPremiumCalendarData
);

export const getPremiumCalendarLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(
  getPremiumCalendarState,
  fromPremiumCalendar.getLoaded
);
