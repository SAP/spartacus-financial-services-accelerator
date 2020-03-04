import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { FSProductAssignmentConnector } from '../../connectors';
import * as fromActions from '../actions';

@Injectable()
export class FSProductAssignmentEffects {
  @Effect()
  loadProductAssignments$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  loadPotentialProductAssignments$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  changeActiveStatus$: Observable<any> = this.actions$.pipe(
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
  );

  constructor(
    private actions$: Actions,
    private productAssignmentConnector: FSProductAssignmentConnector
  ) {}
}
