import * as fromAction from '../actions/card-types.action';

describe('Card Types Actions', () => {
  describe('LoadCardTypes', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadCardTypes();
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CARD_TYPES
      });
    });
  });

  describe('LoadCardTypesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadCardTypesFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CARD_TYPES_FAIL,
        payload: error
      });
    });
  });

  describe('LoadCardTypesSuccess', () => {
    it('should create the action', () => {
      const cardTypes = [
        {
          code: 'amex',
          name: 'American Express'
        },
        {
          isocode: 'maestro',
          name: 'Maestro'
        }
      ];
      const action = new fromAction.LoadCardTypesSuccess(cardTypes);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CARD_TYPES_SUCCESS,
        payload: cardTypes
      });
    });
  });
});
