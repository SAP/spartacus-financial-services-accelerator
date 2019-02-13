import { Action } from '@ngrx/store';

export const LOAD_QUOTES = '[Quote] Load Quotes';
export const LOAD_QUOTES_SUCCESS = '[Quote] Load Quotes Success';
export const LOAD_QUOTES_FAIL = '[Quote] Load Quotes Fail';

export class LoadQuotes implements Action {
  readonly type = LOAD_QUOTES;
  constructor(public payload: any) {}
}

export class LoadQuotesSuccess implements Action {
  readonly type = LOAD_QUOTES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadQuotesFail implements Action {
  readonly type = LOAD_QUOTES_FAIL;
  constructor(public payload: any) {}
}

export type QuoteAction =
  | LoadQuotes
  | LoadQuotesSuccess
  | LoadQuotesFail;
