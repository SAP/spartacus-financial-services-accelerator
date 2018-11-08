import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';

import * as fromPage from './page.reducer';
import * as fromComponent from './component.reducer';
import * as fromNavigation from './navigation-entry-item.reducer';

export interface CmsState {
  page: fromPage.PageState;
  component: fromComponent.ComponentState;
  navigation: fromNavigation.NavigationItemState;
}

export function getReducers(): ActionReducerMap<CmsState> {
  return {
    page: fromPage.reducer,
    component: fromComponent.reducer,
    navigation: fromNavigation.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CmsState>
> = new InjectionToken<ActionReducerMap<CmsState>>('CmsReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getCmsState: MemoizedSelector<
  any,
  CmsState
> = createFeatureSelector<CmsState>('cms');

export function clearCmsState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (
      action.type === '[Site-context] Language Change' ||
      action.type === '[Auth] Logout' ||
      action.type === '[Auth] Login'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCmsState];
