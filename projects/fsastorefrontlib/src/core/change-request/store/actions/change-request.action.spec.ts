import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import * as fromAction from './change-request.action';
import { CHANGE_REQUEST_DATA } from '../change-request-state';
import { StateLoaderActions } from '@spartacus/core';

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
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
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
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
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
      const action = new fromAction.SimulateChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.SIMULATE_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
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
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
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
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
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
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
      });
    });
  });

  describe('UpdateChangeRequest Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      userId: OCC_CART_ID_CURRENT,
    };
    it('should create the action', () => {
      const action = new fromAction.UpdateChangeRequest(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_CHANGE_REQUEST,
        payload: changeRequest,
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
      });
    });
  });

  describe('UpdateChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      insurancePolicy: {
        categoryData: {
          code: 'test_category',
        },
      },
    };
    it('should create the action', () => {
      const action = new fromAction.UpdateChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
      });
    });
  });

  describe('UpdateChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.UpdateChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_CHANGE_REQUEST_FAIL,
        payload: error,
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
      });
    });
  });

  describe('SubmitChangeRequest Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      userId: OCC_CART_ID_CURRENT,
    };
    it('should create the action', () => {
      const action = new fromAction.SubmitChangeRequest(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.SUBMIT_CHANGE_REQUEST,
        payload: changeRequest,
        meta: StateLoaderActions.loadMeta(CHANGE_REQUEST_DATA),
      });
    });
  });

  describe('SubmitChangeRequestSuccess Action', () => {
    const changeRequest = {
      requestId: 'requestId',
      insurancePolicy: {
        categoryData: {
          code: 'test_category',
        },
      },
    };
    it('should create the action', () => {
      const action = new fromAction.SubmitChangeRequestSuccess(changeRequest);
      expect({ ...action }).toEqual({
        type: fromAction.SUBMIT_CHANGE_REQUEST_SUCCESS,
        payload: changeRequest,
        meta: StateLoaderActions.successMeta(CHANGE_REQUEST_DATA),
      });
    });
  });

  describe('SubmitChangeRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.SubmitChangeRequestFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.SUBMIT_CHANGE_REQUEST_FAIL,
        payload: error,
        meta: StateLoaderActions.failMeta(CHANGE_REQUEST_DATA, error),
      });
    });
  });
});
