import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { ProductAssignmentConnector } from '../../connectors';
import * as fromActions from '../actions';

@Injectable()
export class ProductAssignmentEffects {
  loadProductAssignments$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_PRODUCT_ASSIGNMENTS),
      map((action: fromActions.LoadProductAssignments) => action.payload),
      mergeMap(payload => {
        return this.productAssignmentConnector
          .loadProductAssignmentsForUnit(
            payload.occUserId,
            payload.orgUnitId,
            payload.active,
            payload.pageSize,
            payload.currentPage,
            payload.sort
          )
          .pipe(
            map((productAssignments: any) => {
              return new fromActions.LoadProductAssignmentsSuccess(
                productAssignments
              );
            }),
            catchError(error =>
              of(
                new fromActions.LoadProductAssignmentsFail({
                  error: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  createProductAssignment$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_PRODUCT_ASSIGNMENT),
      map((action: fromActions.CreateProductAssignment) => action.payload),
      mergeMap(payload => {
        return this.productAssignmentConnector
          .createProductAssignment(
            payload.userId,
            payload.orgUnitId,
            payload.productCode
          )
          .pipe(
            map((productAssignments: any) => {
              return new fromActions.CreateProductAssignmentSuccess(
                productAssignments
              );
            }),
            catchError(error =>
              of(
                new fromActions.CreateProductAssignmentFail({
                  error: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  removeProductAssignment$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.REMOVE_PRODUCT_ASSIGNMENT),
      map((action: fromActions.RemoveProductAssignment) => action.payload),
      mergeMap(payload => {
        return this.productAssignmentConnector
          .removeProductAssignment(
            payload.userId,
            payload.orgUnitId,
            payload.productAssignmentCode
          )
          .pipe(
            switchMap(() => {
              return [
                new fromActions.RemoveProductAssignmentSuccess(),
                new fromActions.LoadPotentialProductAssignments({
                  occUserId: payload.userId,
                  orgUnitId: payload.parentOrgUnit,
                }),
              ];
            }),
            catchError(error =>
              of(
                new fromActions.RemoveProductAssignmentFail({
                  error: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  loadPotentialProductAssignments$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS),
      map(
        (action: fromActions.LoadPotentialProductAssignments) => action.payload
      ),
      mergeMap(payload => {
        return this.productAssignmentConnector
          .loadProductAssignmentsForUnit(payload.occUserId, payload.orgUnitId)
          .pipe(
            map((productAssignments: any) => {
              return new fromActions.LoadPotentialProductAssignmentsSuccess(
                productAssignments
              );
            }),
            catchError(error =>
              of(
                new fromActions.LoadPotentialProductAssignmentsFail({
                  error: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  changeActiveStatus$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UPDATE_PRODUCT_ASSIGNMENT),
      map((action: fromActions.UpdateProductAssignment) => action.payload),
      concatMap(payload => {
        return this.productAssignmentConnector
          .changeActiveStatus(
            payload.userId,
            payload.orgUnitId,
            payload.productAssignmentCode,
            payload.active
          )
          .pipe(
            map((productAssignment: any) => {
              return new fromActions.UpdateProductAssignmentSuccess(
                productAssignment
              );
            }),
            catchError(error =>
              of(
                new fromActions.UpdateProductAssignmentFail({
                  error: JSON.stringify(error),
                })
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productAssignmentConnector: ProductAssignmentConnector
  ) {}
}
