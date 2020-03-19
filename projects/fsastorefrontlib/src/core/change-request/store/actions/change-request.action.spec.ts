import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import * as fromAction from './change-request.action';

describe('Change Request Actions', () => {
  describe('CreateChangeRequest Action', () => {
    it('should create the action', () => {
      const userId = 'user@email.com';
      const policyId = 'policyId';
      const contractId = 'contractId';
      const action = new fromAction.CreateChangeRequest({
        policyId,
        contractId,
        userId,
      });

      expect({ ...action }).toEqual({
        type: fromAction.CREATE_CHANGE_REQUEST,
        payload: { policyId, contractId, userId },
      });
    });
  });

  describe('CreateChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.CreateChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.CREATE_CHANGE_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('CreateChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
    };
    it('should create the action', () => {
      const action = new fromAction.CreateChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.CREATE_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
      });
    });
  });

  describe('SimulateChangeRequest Action', () => {
    it('should create the action', () => {
      const userId = 'user@email.com';
      const requestId = 'requestId';
      const changeRequest = {};
      const action = new fromAction.SimulateChangeRequest({
        userId,
        requestId,
        changeRequest,
      });

      expect({ ...action }).toEqual({
        type: fromAction.SIMULATE_CHANGE_REQUEST,
        payload: { userId, requestId, changeRequest },
      });
    });
  });

  describe('SimulateChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      insurancePolicy: {
        categoryData: {
          code: 'test_category',
        },
      },
    };
    it('should create the action', () => {
      const action = new fromAction.SimulateChangeRequestSucess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.SIMULATE_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
      });
    });
  });

  describe('SimulateChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.SimulateChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.SIMULATE_CHANGE_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadChangeRequest Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      userId: OCC_CART_ID_CURRENT,
    };
    it('should create the action', () => {
      const action = new fromAction.LoadChangeRequest(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CHANGE_REQUEST,
        payload: changeRequest,
      });
    });
  });

  describe('LoadChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      insurancePolicy: {
        categoryData: {
          code: 'test_category',
        },
      },
    };
    it('should create the action', () => {
      const action = new fromAction.LoadChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
      });
    });
  });

  describe('LoadChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.LoadChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CHANGE_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('CancelChangeRequest Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      userId: OCC_CART_ID_CURRENT,
    };
    it('should create the action', () => {
      const action = new fromAction.CancelChangeRequest(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.CANCEL_CHANGE_REQUEST,
        payload: changeRequest,
      });
    });
  });

  describe('CancelChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      insurancePolicy: {
        categoryData: {
          code: 'test_category',
        },
      },
    };
    it('should create the action', () => {
      const action = new fromAction.CancelChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.CANCEL_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
      });
    });
  });

  describe('CancelChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.CancelChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.CANCEL_CHANGE_REQUEST_FAIL,
        payload: error,
      });
    });
  });
});
