import * as fromAction from '../actions';
import * as fromReducer from '../reducers/form-definition.reducer';

const mockedFormDefinition = {
  formId: 'formId',
  content: 'content',
};
const { initialState } = fromReducer;

describe('Form Definition Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.FormDefinitionAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_FORM_DEFINITION_SUCCESS', () => {
    it('should load form definition success', () => {
      const action = new fromAction.LoadFormDefinitionSuccess(
        mockedFormDefinition
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedFormDefinition);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_FORM_DEFINITION', () => {
    it('should load form definition', () => {
      const action = new fromAction.LoadFormDefinition(mockedFormDefinition);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual({});
      expect(state.loaded).toEqual(false);
    });
  });
});
