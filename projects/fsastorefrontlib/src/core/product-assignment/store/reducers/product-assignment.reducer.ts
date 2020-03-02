import * as fromAction from '../actions/';

export interface ProductAssignmentState {
  loaded: boolean;
  content: {
    assignments: any[];
    potentialAssignments: any[];
  };
}

export const initialState: ProductAssignmentState = {
  loaded: false,
  content: {
    assignments: [],
    potentialAssignments: [],
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
    case fromAction.LOAD_CUSTOMER_PROFILE: {
      const content = { ...action.payload };
      // console.log('from reducer: ', content);
      return {
        ...state,
        content,
      };
    }
    case fromAction.UPDATE_PRODUCT_ASSIGNMENT_SUCCESS: {
      let content = { ...action.payload };
      const productAssignmentContent = state.content;
      if (content && content.code) {
        productAssignmentContent.assignments = productAssignmentContent.assignments.map(
          assignment => {
            if (content.code === assignment.code) {
              assignment = content;
            }
            return assignment;
          }
        );
      }
      content = productAssignmentContent;
      return {
        ...state,
        content,
        loaded: true,
      };
    }
  }
  return state;
}

// Returns entire response from backend with sorting and pagination data
export const getProductAssignmentContent = (state: ProductAssignmentState) =>
  state.content;
export const getProductAssignments = (state: ProductAssignmentState) =>
  state.content.assignments;
export const getLoaded = (state: ProductAssignmentState) => state.loaded;
