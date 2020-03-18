import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import * as fromAction from './product-assignment.action';

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
const userId = OCC_USER_ID_CURRENT;
const orgUnitId = 'TestOrgUnit';
const productCode = '000014';
const productAssignmentCode = 'PA-test';
const active = false;
const error = 'error';

describe('Product Assignment Actions', () => {
  describe('LoadProductAssignments Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadProductAssignments({
        userId: userId,
        orgUnitId: orgUnitId,
      });

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_PRODUCT_ASSIGNMENTS,
        payload: { userId, orgUnitId },
      });
    });
  });

  describe('LoadProductAssignmentsFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadProductAssignmentsFail({ error });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_PRODUCT_ASSIGNMENTS_FAIL,
        payload: {
          error: error,
        },
      });
    });
  });

  describe('LoadProductAssignmentsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadProductAssignmentsSuccess(
        mockProductAssignments
      );
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_PRODUCT_ASSIGNMENTS_SUCCESS,
        payload: mockProductAssignments,
      });
    });
  });

  describe('CreateProductAssignment Action', () => {
    it('should create the action', () => {
      const action = new fromAction.CreateProductAssignment({
        userId: userId,
        orgUnitId: orgUnitId,
        productCode: productCode,
      });

      expect({ ...action }).toEqual({
        type: fromAction.CREATE_PRODUCT_ASSIGNMENT,
        payload: { userId, orgUnitId, productCode },
      });
    });
  });

  describe('CreateProductAssignmentSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.CreateProductAssignmentSuccess(
        mockProductAssignments
      );
      expect({ ...action }).toEqual({
        type: fromAction.CREATE_PRODUCT_ASSIGNMENT_SUCCESS,
        payload: mockProductAssignments,
      });
    });
  });

  describe('CreateProductAssignmentFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.CreateProductAssignmentFail({ error });
      expect({ ...action }).toEqual({
        type: fromAction.CREATE_PRODUCT_ASSIGNMENT_FAIL,
        payload: {
          error: error,
        },
      });
    });
  });

  describe('RemoveProductAssignment Action', () => {
    it('should create the action', () => {
      const action = new fromAction.RemoveProductAssignment({
        userId: userId,
        orgUnitId: orgUnitId,
        productCode: productCode,
      });

      expect({ ...action }).toEqual({
        type: fromAction.REMOVE_PRODUCT_ASSIGNMENT,
        payload: { userId, orgUnitId, productCode },
      });
    });
  });

  describe('RemoveProductAssignmentSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.RemoveProductAssignmentSuccess();
      expect({ ...action }).toEqual({
        type: fromAction.REMOVE_PRODUCT_ASSIGNMENT_SUCCESS,
      });
    });
  });

  describe('RemoveProductAssignmentFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.RemoveProductAssignmentFail({ error });
      expect({ ...action }).toEqual({
        type: fromAction.REMOVE_PRODUCT_ASSIGNMENT_FAIL,
        payload: {
          error: error,
        },
      });
    });
  });

  describe('LoadPotentialProductAssignments Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadPotentialProductAssignments({
        userId: userId,
        orgUnitId: orgUnitId,
      });

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS,
        payload: { userId, orgUnitId },
      });
    });
  });

  describe('LoadPotentialProductAssignmentsFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadPotentialProductAssignmentsFail({
        error,
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_FAIL,
        payload: {
          error: error,
        },
      });
    });
  });

  describe('LoadPotentialProductAssignmentsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadPotentialProductAssignmentsSuccess(
        mockProductAssignments
      );
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS,
        payload: mockProductAssignments,
      });
    });
  });

  describe('ProductAssignment Action', () => {
    it('should create the action', () => {
      const action = new fromAction.UpdateProductAssignment({
        userId: userId,
        orgUnitId: orgUnitId,
        productAssignmentCode: productAssignmentCode,
        active: active,
      });
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_PRODUCT_ASSIGNMENT,
        payload: { userId, orgUnitId, productAssignmentCode, active },
      });
    });
  });

  describe('UpdateProductAssignmentSuccess Action', () => {
    const updatedProductAssignment = {
      active: false,
      code: 'testOne',
      product: {
        code: 'testProduct',
      },
    };
    it('should create the action', () => {
      const action = new fromAction.UpdateProductAssignmentSuccess(
        updatedProductAssignment
      );
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_PRODUCT_ASSIGNMENT_SUCCESS,
        payload: updatedProductAssignment,
      });
    });
  });

  describe('UpdateProductAssignmentFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.UpdateProductAssignmentFail({ error });
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_PRODUCT_ASSIGNMENT_FAIL,
        payload: {
          error: error,
        },
      });
    });
  });
});
