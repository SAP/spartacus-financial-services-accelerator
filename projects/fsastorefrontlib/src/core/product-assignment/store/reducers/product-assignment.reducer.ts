import * as fromAction from '../actions/';

export interface ProductAssignmentState {
  loaded: boolean;
  content: {};
}

export const initialState: ProductAssignmentState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.ProductAssignmentActions
): ProductAssignmentState {
  switch (action.type) {
    case fromAction.LOAD_PRODUCT_ASSIGNMENTS: {
      return {
        ...state,
        loaded: false,
      };
    }
    case fromAction.LOAD_PRODUCT_ASSIGNMENTS_SUCCESS: {
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

export const getProductAssignment = (state: ProductAssignmentState) =>
  state.content;
export const getLoaded = (state: ProductAssignmentState) => state.loaded;
