import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromClaim from './claim.reducer';

export interface ClaimState {
  active: fromClaim.ClaimState;
}

export function getReducers(): ActionReducerMap<ClaimState> {
  return {
    active: fromClaim.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ClaimState>
> = new InjectionToken<ActionReducerMap<ClaimState>>('ClaimReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getClaimState: MemoizedSelector<
  any,
  ClaimState
> = createFeatureSelector<ClaimState>('claim');