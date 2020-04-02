import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  MY_ACCOUNT_FEATURE,
  MyAccountState,
  StateWithMyAccount,
} from '../my-account-state';

export const getUserState: MemoizedSelector<
  StateWithMyAccount,
  MyAccountState
> = createFeatureSelector<MyAccountState>(MY_ACCOUNT_FEATURE);
