import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { FSProductAssignmentConnector } from '../../connectors';

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

  constructor(
    private actions$: Actions,
    private productAssignmentConnector: FSProductAssignmentConnector
  ) {}
}
