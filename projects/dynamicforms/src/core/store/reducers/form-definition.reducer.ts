import * as fromAction from '../actions/';
import { FormDefinitionState } from '../form-definition-state';

export const initialState: FormDefinitionState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.FormDefinitionAction
): FormDefinitionState {
  switch (action.type) {
    case fromAction.LOAD_FORM_DEFINITION: {
      return {
        ...state,
        loaded: false,
      };
    }

    case fromAction.LOAD_FORM_DEFINITION_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
  }
  return state;
}
export const getFormDefinition = (state: FormDefinitionState) => state.content;
export const getLoaded = (state: FormDefinitionState) => state.loaded;
