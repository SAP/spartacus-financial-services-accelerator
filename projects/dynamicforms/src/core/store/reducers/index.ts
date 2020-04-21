import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions, loaderReducer } from '@spartacus/core';
import * as fromReducer from './form-definition.reducer';

import {
  FORM_DEFINITION_DATA,
  FormDefinitionsState,
  FormDefinitionState,
} from '../form-definition-state';

export function getReducers(): ActionReducerMap<FormDefinitionsState> {
  return {
    formDefinition: loaderReducer<FormDefinitionState>(
      FORM_DEFINITION_DATA,
      fromReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FormDefinitionsState>
> = new InjectionToken<ActionReducerMap<FormDefinitionsState>>(
  'FormDefinitionReducers'
);
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export function clearFormDefinitionState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
      localStorage.removeItem('dynamicFormsData');
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearFormDefinitionState];
