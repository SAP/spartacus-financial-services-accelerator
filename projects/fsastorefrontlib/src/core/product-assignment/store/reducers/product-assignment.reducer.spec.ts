import * as fromAction from '../actions';
import * as fromReducer from '../reducers/product-assignment.reducer';

const mockProductAssignments = {
  assignments: [
    {
      active: true,
      code: 'testOne',
      product: {
        code: 'testProduct',
      },
    },
    {
      active: false,
      code: 'testTwo',
      product: {
        code: 'testProduct',
      },
    },
  ],
};

const { initialState } = fromReducer;

describe('Product Assignment Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.ProductAssignmentActions;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PRODUCT_ASSIGNMENTS_SUCCESS', () => {
    it('should load product assignments', () => {
      const action = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockProductAssignments);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('UPDATE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should update product assignment state', () => {
      const updatedProductAssignment = {
        active: false,
        code: 'testOne',
        product: {
          code: 'testProduct',
        },
      };
      const initialAction = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const updateAction = new fromAction.UpdateProductAssignmentSuccess(
        updatedProductAssignment
      );
      const state = fromReducer.reducer(initialState, initialAction);
      const changedState = fromReducer.reducer(state, updateAction);
      expect(state.content.assignments[0]).toEqual(updatedProductAssignment);
      expect(state.loaded).toEqual(true);
    });
  });
});
