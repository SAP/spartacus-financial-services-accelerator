import { Action } from '@ngrx/store';
import { StateUtils, MULTI_CART_DATA } from '@spartacus/core';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTES = '[Quote] Load Quotes';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTES_SUCCESS = '[Quote] Load Quotes Success';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTES_FAIL = '[Quote] Load Quotes Fail';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const UPDATE_QUOTE = '[Quote] Update Quote';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const UPDATE_QUOTE_SUCCESS = '[Quote] Update Quote Success';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const UPDATE_QUOTE_FAIL = '[Quote] Update Quote Fail';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const QUOTE_PROCESS_ACTION = '[Quote] Quote Process Action';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_DETAILS = '[Quote] Load Quote Details';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_DETAILS_SUCCESS = '[Quote] Load Quote Success';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_DETAILS_FAIL = '[Quote] Load Quote Fail';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_COMPARISON = '[Quote] Load Quote Comparison';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_COMPARISON_SUCCESS = '[Quote] Load Comparison Success';
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const LOAD_QUOTE_COMPARISON_FAIL = '[Quote] Load Comparison Fail';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuotes implements Action {
  readonly type = LOAD_QUOTES;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuotesSuccess implements Action {
  readonly type = LOAD_QUOTES_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuotesFail implements Action {
  readonly type = LOAD_QUOTES_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class UpdateQuote implements Action {
  readonly type = UPDATE_QUOTE;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class UpdateQuoteSuccess implements Action {
  readonly type = UPDATE_QUOTE_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class UpdateQuoteFail implements Action {
  readonly type = UPDATE_QUOTE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class QuoteProcessAction extends StateUtils.LoaderLoadAction {
  readonly type = QUOTE_PROCESS_ACTION;
  constructor(public payload: any) {
    super(MULTI_CART_DATA);
  }
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteDetails implements Action {
  readonly type = LOAD_QUOTE_DETAILS;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteDetailsSuccess implements Action {
  readonly type = LOAD_QUOTE_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteDetailsFail implements Action {
  readonly type = LOAD_QUOTE_DETAILS_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteComparison implements Action {
  readonly type = LOAD_QUOTE_COMPARISON;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteComparisonSuccess implements Action {
  readonly type = LOAD_QUOTE_COMPARISON_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export class LoadQuoteComparisonFail implements Action {
  readonly type = LOAD_QUOTE_COMPARISON_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export type QuoteAction =
  | LoadQuotes
  | LoadQuotesSuccess
  | LoadQuotesFail
  | UpdateQuote
  | UpdateQuoteSuccess
  | QuoteProcessAction
  | LoadQuoteDetails
  | LoadQuoteDetailsSuccess
  | LoadQuoteDetailsFail
  | LoadQuoteComparison
  | LoadQuoteComparisonSuccess
  | LoadQuoteComparisonFail;
