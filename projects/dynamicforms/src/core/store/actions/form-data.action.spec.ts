import { YFormData } from './../../models/form-occ.models';
import * as fromAction from './form-data.action';

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

describe('Form Data Actions', () => {
  describe('LoadFormData Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadFormData(formData);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DATA,
        payload: formData,
      });
    });
  });

  describe('LoadFormDataSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadFormDataSuccess(formData);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DATA_SUCCESS,
        payload: formData,
      });
    });
  });

  describe('LoadFormDataFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.LoadFormDataFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_FORM_DATA_FAIL,
        payload: error,
      });
    });
  });

  describe('SaveFormData Action', () => {
    it('should create the action', () => {
      const action = new fromAction.SaveFormData(formData);
      expect({ ...action }).toEqual({
        type: fromAction.SAVE_FORM_DATA,
        payload: formData,
      });
    });
  });

  describe('SaveFormDataSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.SaveFormDataSuccess(formData);
      expect({ ...action }).toEqual({
        type: fromAction.SAVE_FORM_DATA_SUCCESS,
        payload: formData,
      });
    });
  });

  describe('SaveFormDataFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromAction.SaveFormDataFail(error);
      expect({ ...action }).toEqual({
        type: fromAction.SAVE_FORM_DATA_FAIL,
        payload: error,
      });
    });
  });
});
