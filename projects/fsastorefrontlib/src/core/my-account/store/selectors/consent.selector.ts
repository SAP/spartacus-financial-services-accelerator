import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromConsent from '../reducers/consent.reducer';
import {
  MyAccountState,
  ConsentState,
  StateWithMyAccount,
} from '../my-account-state';

export const getConsentsState: MemoizedSelector<
  StateWithMyAccount,
  ConsentState
> = createSelector(
  fromFeature.getUserState,
  (consentState: MyAccountState) => consentState.consents
);

export const getConsents: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(getConsentsState, fromConsent.getConsents);

export const getConsentsLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(getConsentsState, fromConsent.getLoaded);
