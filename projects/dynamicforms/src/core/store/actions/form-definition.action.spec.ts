import * as fromAction from './form-definition.action';
import { StateLoaderActions } from '@spartacus/core';
import { FORM_DEFINITION_DATA } from '../form-definition-state';

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
        meta: StateLoaderActions.loadMeta(FORM_DEFINITION_DATA),
      });
    });
  });

  describe('LoadFormDefinitionSuccess Action', () => {
    const formDefinition = {
      formId: 'requestId',
      formGroups: {},
    };
    it('should create the action', () => {
      const action = new fromAction.LoadFormDefinitionSuccess(formDefinition);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DEFINITION_SUCCESS,
        payload: formDefinition,
        meta: StateLoaderActions.successMeta(FORM_DEFINITION_DATA),
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
        meta: StateLoaderActions.failMeta(FORM_DEFINITION_DATA, error),
      });
    });
  });
});
