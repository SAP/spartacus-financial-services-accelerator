import * as fromAction from '../actions/';

export interface ProductAssignmentState {
  loaded: boolean;
  content: {
    assignments: any[]
  };
}

export const initialState: ProductAssignmentState = {
  loaded: false,
  content: {
    assignments: []
  },
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
    case fromAction.ACTIVATE_PRODUCT_ASSIGNMENTS_SUCCESS: {
      let content = { ...action.payload };
      const productAssignmentContent = state.content;
      let result;
      if (content.code) {
        result = productAssignmentContent.assignments.map(assignment => {
          if (content.code === assignment.code) {
            assignment = content;
          }
          return assignment;
        });
      }
      productAssignmentContent.assignments = result;
      content = productAssignmentContent;
      console.log({
        ...state,
        content: content,
        loaded: true
      });
      return {
        ...state,
        content,
        loaded: false
      };
    }
  }
  return state;
}

export const getProductAssignment = (state: ProductAssignmentState) =>
  state.content;
  export const getProductAssignment2 = (state: ProductAssignmentState) =>
  state.content.assignments;
export const getLoaded = (state: ProductAssignmentState) => state.loaded;
