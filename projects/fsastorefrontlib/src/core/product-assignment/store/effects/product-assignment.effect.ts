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
          payload.userId,
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
  activateProductAssignment$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ACTIVATE_PRODUCT_ASSIGNMENTS),
    map((action: fromActions.ActivateProductAssignment) => action.payload),
    concatMap(payload => {
      return this.productAssignmentConnector
        .activateProductAssignment(
          payload.userId,
          payload.productAssignmentCode,
          payload.active,
        )
        .pipe(
          map((productAssignment: any) => {
            return new fromActions.ActivateProductAssignmentSuccess(
              productAssignment
            );
          }),
          catchError(error =>
            of(
              new fromActions.ActivateProductAssignmentFail({
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
