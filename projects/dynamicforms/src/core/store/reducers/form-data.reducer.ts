import * as fromAction from '../actions/';
import { FormDataState } from '../state';

export const initialState: FormDataState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.FormDataAction
): FormDataState {
  switch (action.type) {
    case fromAction.SAVE_FORM_DATA:
    case fromAction.LOAD_FORM_DATA: {
      return {
        ...state,
        loaded: false,
      };
    }

    case fromAction.SAVE_FORM_DATA_SUCCESS:
    case fromAction.LOAD_FORM_DATA_SUCCESS: {
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
export const getFormData = (state: FormDataState) => state.content;
export const getLoaded = (state: FormDataState) => state.loaded;
