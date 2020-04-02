export const PRODUCT_ASSIGNMENT_FEATURE = 'productAssignments';

export interface StateWithProductAssignment {
  [PRODUCT_ASSIGNMENT_FEATURE]: ProductAssignmentsState;
}

export interface ProductAssignmentsState {
  productAssignments: ProductAssignmentState;
}

export interface ProductAssignmentState {
  loaded: boolean;
  content: {
    assignments: any[];
    potentialAssignments: any[];
  };
}
