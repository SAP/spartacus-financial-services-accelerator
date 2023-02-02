import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { FormsState } from '../state';
import { DYNAMIC_FORMS_LOCAL_STORAGE_KEY } from './../../services/storage/form-data-storage.service';
import * as fromFormData from './form-data.reducer';
import * as fromFormDefinition from './form-definition.reducer';
import * as fromUploadFiles from './file.reducer';

export function getReducers(): ActionReducerMap<FormsState> {
  return {
    formDefinition: fromFormDefinition.reducer,
    formData: fromFormData.reducer,
    uploadedFiles: fromUploadFiles.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<FormsState>> =
  new InjectionToken<ActionReducerMap<FormsState>>('FormReducers');
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearFormDefinitionState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
      localStorage.removeItem(DYNAMIC_FORMS_LOCAL_STORAGE_KEY);
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearFormDefinitionState];
