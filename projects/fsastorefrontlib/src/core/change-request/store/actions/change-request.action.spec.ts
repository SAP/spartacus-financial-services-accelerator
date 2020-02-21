import * as fromAction from './change-request.action';

describe('Change Request Actions', () => {
  describe('ChangeRequest Action', () => {
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
});
