import { Action } from '@ngrx/store';
import { SearchConfig } from '../../models/search-config';
import { LongitudeLatitude } from '../../models/longitude-latitude';

export const FIND_STORES = '[StoreFinder] Find Stores';
export const FIND_STORES_FAIL = '[StoreFinder] Find Stores Fail';
export const FIND_STORES_SUCCESS = '[StoreFinder] Find Stores Success';

export const FIND_ALL_STORES_BY_COUNTRY =
  '[StoreFinder] Find All Stores by Country';
export const FIND_ALL_STORES_BY_COUNTRY_FAIL =
  '[StoreFinder] Find All Stores by Country Fail';
export const FIND_ALL_STORES_BY_COUNTRY_SUCCESS =
  '[StoreFinder] Find All Stores by Country Success';

export const FIND_ALL_STORES_BY_REGION =
  '[StoreFinder] Find All Stores by Region';
export const FIND_ALL_STORES_BY_REGION_FAIL =
  '[StoreFinder] Find All Stores by Region Fail';
export const FIND_ALL_STORES_BY_REGION_SUCCESS =
  '[StoreFinder] Find All Stores by Region Success';

export class FindStores implements Action {
  readonly type = FIND_STORES;
  constructor(
    public payload: {
      queryText: string;
      longitudeLatitude?: LongitudeLatitude;
      searchConfig?: SearchConfig;
    }
  ) {}
}

export class FindStoresFail implements Action {
  readonly type = FIND_STORES_FAIL;
  constructor(public payload: any) {}
}

export class FindStoresSuccess implements Action {
  readonly type = FIND_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStoresByCountry implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY;
  constructor(public payload: { countryIsoCode: string }) {}
}

export class FindAllStoresByCountryFail implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresByCountrySuccess implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStoresByRegion implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION;
  constructor(
    public payload: { countryIsoCode: string; regionIsoCode: string }
  ) {}
}

export class FindAllStoresByRegionFail implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresByRegionSuccess implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION_SUCCESS;
  constructor(public payload: any) {}
}

export type FindStoresAction =
  | FindStores
  | FindStoresFail
  | FindStoresSuccess
  | FindAllStoresByCountry
  | FindAllStoresByCountryFail
  | FindAllStoresByCountrySuccess
  | FindAllStoresByRegion
  | FindAllStoresByRegionFail
  | FindAllStoresByRegionSuccess;
