import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { FormsState } from '../state';
import * as fromFormData from './form-data.reducer';
import * as fromFormDefinition from './form-definition.reducer';

export function getReducers(): ActionReducerMap<FormsState> {
  return {
    formDefinition: fromFormDefinition.reducer,
    formData: fromFormData.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FormsState>
> = new InjectionToken<ActionReducerMap<FormsState>>('FormReducers');
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
