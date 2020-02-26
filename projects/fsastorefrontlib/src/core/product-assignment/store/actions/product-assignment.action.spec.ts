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
};
describe('Product Assignment Actions', () => {
  describe('ProductAssignment Action', () => {
    it('should create the action', () => {
      const userId = OCC_USER_ID_CURRENT;
      const orgUnitId = 'SAP';
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
      const error = 'error';
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
});
