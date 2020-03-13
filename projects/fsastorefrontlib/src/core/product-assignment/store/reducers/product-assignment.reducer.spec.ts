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
  potentialAssignments: [
    {
      active: true,
      code: 'ewqeqw',
      product: {
        code: 'testProduct',
      },
    },
    {
      active: false,
      code: 'test-product',
      product: {
        code: 'test-product',
      },
    },
  ],
};

const initialLoadedProducts = { assignments: [], potentialAssignments: [] };

const removeProductAssignment = {
  orgUnitId: 'SomeCompany',
  productCode: '0011221',
  parentOrgUnit: 'ParentCompany',
};

const createdProductAssignment = {
  code: '85565',
  product: {
    code: 'test-product',
    name: 'CORONA',
  },
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

  describe('LOAD_PRODUCT_ASSIGNMENTS', () => {
    it('should load product assignments', () => {
      const action = new fromAction.LoadProductAssignments(
        initialLoadedProducts
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockProductAssignments);
      expect(state.loaded).toEqual(false);
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

  describe('LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS', () => {
    it('should load potential product assignments', () => {
      const action = new fromAction.LoadPotentialProductAssignmentsSuccess(
        mockProductAssignments
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockProductAssignments);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('CREATE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should create product assignment', () => {
      const loadProductAssignments = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const action = new fromAction.CreateProductAssignmentSuccess(
        createdProductAssignment
      );
      const state = fromReducer.reducer(initialState, loadProductAssignments);
      const changedState = fromReducer.reducer(state, action);

      expect(changedState.content.potentialAssignments.length).toEqual(1);
      expect(changedState.content.assignments.length).toEqual(3);
    });
  });

  describe('REMOVE_PRODUCT_ASSIGNMENT', () => {
    it('should remove product assignments', () => {
      const loadProductAssignments = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const action = new fromAction.RemoveProductAssignment(
        removeProductAssignment
      );
      const state = fromReducer.reducer(initialState, loadProductAssignments);
      const changedState = fromReducer.reducer(state, action);
      expect(state.content).toEqual(mockProductAssignments);
    });
  });

  describe('REMOVE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should remove product assignments sussesfully', () => {
      const action = new fromAction.RemoveProductAssignmentSuccess();
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockProductAssignments);
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
