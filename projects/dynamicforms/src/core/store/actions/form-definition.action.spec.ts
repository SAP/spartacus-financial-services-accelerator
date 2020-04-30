import * as fromAction from './form-definition.action';

describe('Form Definition Actions', () => {
  describe('LoadFormDefinition Action', () => {
    const formDefinition = {
      formId: 'formId',
      formGroups: {},
    };
    it('should create the action', () => {
      const action = new fromAction.LoadFormDefinition(formDefinition);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DEFINITION,
        payload: formDefinition,
      });
    });
  });

  describe('LoadFormDefinitionSuccess Action', () => {
    const formDefinition = {
      formId: 'formId',
      formGroups: {},
    };
    it('should create the action', () => {
      const action = new fromAction.LoadFormDefinitionSuccess(formDefinition);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DEFINITION_SUCCESS,
        payload: formDefinition,
      });
    });
  });

  describe('LoadFormDefinitionFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.LoadFormDefinitionFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DEFINITION_FAIL,
        payload: error,
      });
    });
  });
});
