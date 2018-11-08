import * as fromUserPaymentMethodsAction from './payment-methods.action';

const userId = '123';

describe('User Payment Methods Actions', () => {
  describe('LoadUserPaymentMethods Actions', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
        userId
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS,
        payload: userId
      });
    });
  });

  describe('LoadUserPaymentMethodsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserPaymentMethodsSuccess Action', () => {
    const mockUserPaymentMethods = { payments: ['payment1', 'payment2'] };

    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS,
        payload: mockUserPaymentMethods
      });
    });
  });
});
