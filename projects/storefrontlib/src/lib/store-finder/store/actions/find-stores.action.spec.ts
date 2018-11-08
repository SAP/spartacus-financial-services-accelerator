import * as fromActions from './find-stores.action';
import { SearchConfig } from '../../models/search-config';
import { LongitudeLatitude } from '../../models/longitude-latitude';

describe('Find Stores Actions', () => {
  describe('FindStores', () => {
    it('should create FindStores action', () => {
      const searchConfig: SearchConfig = { pageSize: 10 };
      const longitudeLatitude: LongitudeLatitude = {
        longitude: 10.1,
        latitude: 20.2
      };
      const payload = { queryText: 'test', longitudeLatitude, searchConfig };
      const action = new fromActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES,
        payload
      });
    });
  });

  describe('FindStores with coordinates', () => {
    it('should create FindStores action with only coordinates', () => {
      const longitudeLatitude: LongitudeLatitude = {
        longitude: 10.1,
        latitude: 20.2
      };
      const payload = { queryText: '', longitudeLatitude };
      const action = new fromActions.FindStores(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES,
        payload
      });
    });
  });

  describe('FindStoresFail', () => {
    it('should create FindStoresFail action', () => {
      const payload = { errorMessage: 'Error' };
      const action = new fromActions.FindStoresFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_FAIL,
        payload
      });
    });
  });

  describe('FindStoresSuccess', () => {
    it('should create FindStoresSuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new fromActions.FindStoresSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_STORES_SUCCESS,
        payload
      });
    });
  });

  describe('FindAllStoresByCountry', () => {
    it('should create FindAllStoresByCountry action', () => {
      const payload = { countryIsoCode: 'test' };
      const action = new fromActions.FindAllStoresByCountry(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_COUNTRY,
        payload
      });
    });
  });

  describe('FindAllStoresByCountryFail', () => {
    it('should create FindAllStoresByCountryFail action', () => {
      const payload = {};
      const action = new fromActions.FindAllStoresByCountryFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_COUNTRY_FAIL,
        payload
      });
    });
  });

  describe('FindAllStoresByCountrySuccess', () => {
    it('should create FindAllStoresByCountrySuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new fromActions.FindAllStoresByCountrySuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_COUNTRY_SUCCESS,
        payload
      });
    });
  });

  describe('FindAllStoresByRegion', () => {
    it('should create FindAllStoresByRegion action', () => {
      const payload = { countryIsoCode: 'test', regionIsoCode: 'test' };
      const action = new fromActions.FindAllStoresByRegion(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_REGION,
        payload
      });
    });
  });

  describe('FindAllStoresByRegionFail', () => {
    it('should create FindAllStoresByRegionFail action', () => {
      const payload = {};
      const action = new fromActions.FindAllStoresByRegionFail(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_REGION_FAIL,
        payload
      });
    });
  });

  describe('FindAllStoresByRegionSuccess', () => {
    it('should create FindAllStoresByRegionSuccess action', () => {
      const payload = [{ stores: ['test'] }];
      const action = new fromActions.FindAllStoresByRegionSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromActions.FIND_ALL_STORES_BY_REGION_SUCCESS,
        payload
      });
    });
  });
});
