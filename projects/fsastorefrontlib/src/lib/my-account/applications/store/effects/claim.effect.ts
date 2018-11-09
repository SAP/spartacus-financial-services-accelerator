import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ClaimsService } from '../../services/claims.service';
import { ClaimDataService } from '../../services/claim-data.service';

@Injectable()
export class ClaimEffects {
  @Effect()
  loadClaims$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLAIMS),
    map((action: fromActions.LoadClaims) =>
      action.payload
    ),
    mergeMap(payload => {
      return this.claimsService.getClaims(payload.userId).pipe(
        map((claims: any) => {
          return new fromActions.LoadClaimsSuccess(claims);
          }),
          catchError(error => of(new fromActions.LoadClaimsFail(error)))
        );
      }
    )
  );

  @Effect()
  removeClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.DELETE_CLAIM),
    map((action: fromActions.DeleteClaim) => action.payload),
    mergeMap(payload =>
      this.claimsService.deleteClaim(payload.userId, payload.claimId).pipe(
        map(() => {
          return new fromActions.DeleteClaimSuccess();
        }),
        catchError(error => of(new fromActions.DeleteClaimFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private claimsService: ClaimsService,
    private claimData: ClaimDataService
  ) {}
}
