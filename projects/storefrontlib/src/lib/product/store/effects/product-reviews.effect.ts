import { Observable, of } from 'rxjs';
import { OccProductService } from './../../../occ/product/product.service';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as productReviewsActions from './../actions/product-reviews.action';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductReviewsEffects {
  @Effect()
  loadProductReviews$: Observable<any> = this.actions$.pipe(
    ofType(productReviewsActions.LOAD_PRODUCT_REVIEWS),
    map((action: productReviewsActions.LoadProductReviews) => action.payload),
    mergeMap(productCode => {
      return this.occProductService.loadProductReviews(productCode).pipe(
        map(data => {
          return new productReviewsActions.LoadProductReviewsSuccess({
            productCode,
            list: data.reviews
          });
        }),
        catchError(_error =>
          of(new productReviewsActions.LoadProductReviewsFail(productCode))
        )
      );
    })
  );

  @Effect()
  postProductReview: Observable<any> = this.actions$.pipe(
    ofType(productReviewsActions.POST_PRODUCT_REVIEW),
    map((action: productReviewsActions.PostProductReview) => action.payload),
    mergeMap(payload => {
      return this.occProductService
        .postProductReview(payload.productCode, payload.review)
        .pipe(
          map(reviewResponse => {
            return new productReviewsActions.PostProductReviewSuccess(
              reviewResponse
            );
          }),
          catchError(_error =>
            of(
              new productReviewsActions.PostProductReviewFail(
                payload.productCode
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService
  ) {}
}
