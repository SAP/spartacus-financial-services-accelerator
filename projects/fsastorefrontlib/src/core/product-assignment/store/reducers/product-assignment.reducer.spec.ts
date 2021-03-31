import { OCC_USER_ID_CURRENT } from '@spartacus/core';
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
      code: 'testProduct1',
      product: {
        code: 'testProductCode1',
      },
    },
    {
      active: false,
      code: 'test-product2',
      product: {
        code: 'testProductCode2',
      },
    },
  ],
};

const productAssignmentPayload = {
  userId: OCC_USER_ID_CURRENT,
  orgUnitId: 'AirlineCompany',
  productAssignmentCode: 'testOne',
  parentOrgUnit: 'SAP',
};

const createdProductAssignment = {
  code: '85565',
  product: {
    code: 'testProductCode1',
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

  describe('CREATE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should create product assignment', () => {
      const loadProductAssignments = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const createSuccess = new fromAction.CreateProductAssignmentSuccess(
        createdProductAssignment
      );
      const state = fromReducer.reducer(initialState, loadProductAssignments);
      const finalState = fromReducer.reducer(state, createSuccess);
      expect(finalState.content.assignments.length).toEqual(3);
      expect(finalState.content.potentialAssignments.length).toEqual(1);
    });
  });

  describe('REMOVE_PRODUCT_ASSIGNMENT', () => {
    it('should remove product assignments', () => {
      const loadProductAssignments = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const action = new fromAction.RemoveProductAssignment(
        productAssignmentPayload
      );
      const state = fromReducer.reducer(initialState, loadProductAssignments);
      const changedState = fromReducer.reducer(state, action);
      expect(changedState.content.assignments.length).toEqual(1);
    });
  });

  describe('REMOVE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should remove product assignments sussesfully', () => {
      const action = new fromAction.RemoveProductAssignmentSuccess();
      const state = fromReducer.reducer(initialState, action);
      expect(state.content.assignments.length).toEqual(0);
    });
  });

  describe('UPDATE_PRODUCT_ASSIGNMENT_SUCCESS', () => {
    it('should update product assignment state', () => {
      const updatedProductAssignment = {
        active: true,
        code: 'testOne',
        product: {
          code: 'testProduct',
        },
      };
      const initialAction = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      const state = fromReducer.reducer(initialState, initialAction);
      expect(state.content.assignments[0]).toEqual(updatedProductAssignment);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS', () => {
    it('should load potential product assignment', () => {
      const action = new fromAction.LoadPotentialProductAssignmentsSuccess(
        mockProductAssignments
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content.potentialAssignments.length).toEqual(2);
      expect(state.loaded).toEqual(true);
    });
  });
});
