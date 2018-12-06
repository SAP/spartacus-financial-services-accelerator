import { Action } from '@ngrx/store';

export const LOAD_PRODUCT_REVIEWS = '[Product] Load Product Reviews Data';
export const LOAD_PRODUCT_REVIEWS_FAIL =
  '[Product] Load Product Reviews Data Fail';
export const LOAD_PRODUCT_REVIEWS_SUCCESS =
  '[Product] Load Product Reviews Data Success';
export const POST_PRODUCT_REVIEW = '[Product] Post Product Review';
export const POST_PRODUCT_REVIEW_FAIL = '[Product] Post Product Review Fail';
export const POST_PRODUCT_REVIEW_SUCCESS =
  '[Product] Post Product Review Success';

export class LoadProductReviews implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS;
  constructor(public payload: string) {}
}

export class LoadProductReviewsFail implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductReviewsSuccess implements Action {
  readonly type = LOAD_PRODUCT_REVIEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class PostProductReview implements Action {
  readonly type = POST_PRODUCT_REVIEW;
  constructor(public payload: any) {}
}

export class PostProductReviewFail implements Action {
  readonly type = POST_PRODUCT_REVIEW_FAIL;
  constructor(public payload: any) {}
}

export class PostProductReviewSuccess implements Action {
  readonly type = POST_PRODUCT_REVIEW_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type ProductReviewsAction =
  | LoadProductReviews
  | LoadProductReviewsFail
  | LoadProductReviewsSuccess
  | PostProductReview
  | PostProductReviewFail
  | PostProductReviewSuccess;
