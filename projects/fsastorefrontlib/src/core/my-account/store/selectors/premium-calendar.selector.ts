import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromPremiumCalendar from '../reducers/premium-calendar.reducer';
import {
  MyAccountState,
  PremiumCalendarState,
  StateWithMyAccount,
} from '../my-account-state';

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getPremiumCalendarState: MemoizedSelector<
  StateWithMyAccount,
  PremiumCalendarState
> = createSelector(
  fromFeature.getUserState,
  (myAccountState: MyAccountState) => myAccountState.premiumCalendar
);

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getPremiumCalendarData: MemoizedSelector<StateWithMyAccount, any> =
  createSelector(
    getPremiumCalendarState,
    fromPremiumCalendar.getPremiumCalendarData
  );

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getPremiumCalendarLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(getPremiumCalendarState, fromPremiumCalendar.getLoaded);
