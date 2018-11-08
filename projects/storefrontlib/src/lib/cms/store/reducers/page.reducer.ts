import * as fromPageData from '../actions/page.action';
import { Page } from '../../models/page.model';

export interface PageState {
  entities: { [context: string]: Page };
  count: number;
  latestPageKey: string;
}

export const initialState: PageState = {
  entities: {},
  count: 0,
  latestPageKey: ''
};

export function reducer(
  state = initialState,
  action: fromPageData.PageAction
): PageState {
  switch (action.type) {
    case fromPageData.UPDATE_LATEST_PAGE_KEY: {
      const pageKey = action.payload;
      return {
        ...state,
        latestPageKey: pageKey
      };
    }

    case fromPageData.LOAD_PAGEDATA_SUCCESS: {
      let page = action.payload;

      const existPage = state.entities[page.key];
      if (existPage != null) {
        let samePage = true;
        for (const position of Object.keys(page.value.slots)) {
          if (
            page.value.slots[position].length !==
            existPage.slots[position].length
          ) {
            samePage = false;
            break;
          }
        }
        if (samePage) {
          page = {
            ...page,
            value: {
              ...page.value,
              seen: [...page.value.seen, ...existPage.seen]
            }
          };
        }
      }

      const entities = {
        ...state.entities,
        [page.key]: page.value
      };

      return {
        ...state,
        entities,
        count: state.count + 1,
        latestPageKey: page.key
      };
    }

    case fromPageData.CLEAN_PAGE_STATE: {
      return initialState;
    }
  }
  return state;
}

export const getPageEntities = (state: PageState) => state.entities;
export const getPageCount = (state: PageState) => state.count;
export const getLatestPageKey = (state: PageState) => state.latestPageKey;
