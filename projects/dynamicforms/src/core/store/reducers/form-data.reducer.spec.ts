import * as fromAction from '../actions';
import * as fromReducer from '../reducers/form-data.reducer';
import { YFormData } from './../../models/form-occ.models';

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const { initialState } = fromReducer;

describe('Form Data Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.FormDataAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_FORM_DATA', () => {
    it('should load form data', () => {
      const action = new fromAction.LoadFormData(formData.id);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual({});
      expect(state.loaded).toEqual(false);
    });

    it('should load form data success', () => {
      const action = new fromAction.LoadFormDataSuccess(formData);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(formData);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('SAVE_FORM_DATA', () => {
    it('should save form data', () => {
      const action = new fromAction.SaveFormData(formData);
      const state = fromReducer.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });

    it('should save form data success', () => {
      const action = new fromAction.SaveFormDataSuccess(formData);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(formData);
      expect(state.loaded).toEqual(true);
    });
  });
});
