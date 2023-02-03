import * as fromAction from '../actions/';
import { ProductAssignmentState } from '../product-assignments-state';

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

    case fromAction.LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS: {
      let content = { ...action.payload };
      const assignmentsContent = JSON.parse(JSON.stringify(state.content));
      if (content && content.assignments.length > 0) {
        assignmentsContent.potentialAssignments = content.assignments;
      }
      assignmentsContent.potentialAssignments =
        assignmentsContent.potentialAssignments.filter(
          elem =>
            !assignmentsContent.assignments
              .map(data => data.product.code)
              .includes(elem.product.code)
        );
      content = assignmentsContent;
      return {
        ...state,
        content,
        loaded: true,
      };
    }

    case fromAction.CREATE_PRODUCT_ASSIGNMENT_SUCCESS: {
      let content = { ...action.payload };
      const productAssignmentContent = JSON.parse(
        JSON.stringify(state.content)
      );
      if (content && content.code) {
        productAssignmentContent.assignments = [
          ...productAssignmentContent.assignments,
          content,
        ];
        const potentialAssignment =
          productAssignmentContent.potentialAssignments.find(
            productAssignment =>
              productAssignment.product.code === content.product.code
          );
        productAssignmentContent.potentialAssignments =
          productAssignmentContent.potentialAssignments.filter(
            elem =>
              !potentialAssignment.product.code.includes(elem.product.code)
          );
      }
      content = productAssignmentContent;
      return {
        ...state,
        content,
      };
    }

    case fromAction.REMOVE_PRODUCT_ASSIGNMENT: {
      let content = { ...action.payload };
      const productAssignmentContent = JSON.parse(
        JSON.stringify(state.content)
      );
      if (content && content.productAssignmentCode) {
        const assignments = productAssignmentContent.assignments.find(
          currentProductAssignment =>
            currentProductAssignment.code === content.productAssignmentCode
        );
        productAssignmentContent.assignments =
          productAssignmentContent.assignments.filter(
            elem => !assignments.code.includes(elem.code)
          );
      }
      content = productAssignmentContent;
      return {
        ...state,
        content,
      };
    }

    case fromAction.REMOVE_PRODUCT_ASSIGNMENT_SUCCESS: {
      return {
        ...state,
      };
    }

    case fromAction.UPDATE_PRODUCT_ASSIGNMENT_SUCCESS: {
      let content = { ...action.payload };
      const productAssignmentContent = JSON.parse(
        JSON.stringify(state.content)
      );
      if (content && content.code) {
        productAssignmentContent.assignments =
          productAssignmentContent.assignments.map(assignment => {
            if (content.code === assignment.code) {
              assignment = content;
            }
            return assignment;
          });
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

export const getPotentialProductAssignments = (state: ProductAssignmentState) =>
  state.content.potentialAssignments;

export const getLoaded = (state: ProductAssignmentState) => state.loaded;
