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
});
