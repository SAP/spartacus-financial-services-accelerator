import { Injectable } from '@angular/core';

import * as fromActions from '../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { OccClaimService } from '../../../../occ/services/claim/claim.service';
import { ClaimDataService } from '../../services/claim-data.service';
import { Claim } from '../../../../occ/occ-models';
import * as fromUserRequestActions from '../../../user-request/store/actions';

@Injectable()
export class ClaimEffects {
  @Effect()
  loadClaims$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLAIMS),
    map((action: fromActions.LoadClaims) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.claimData.userId,
          claims: this.claimData.claims,
        };
      }
      return this.claimService.getClaims(payload.userId).pipe(
        map((claims: any) => {
          return new fromActions.LoadClaimsSuccess(claims);
        }),
        catchError(error => of(new fromActions.LoadClaimsFail(error)))
      );
    })
  );

  @Effect()
  removeClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.DELETE_CLAIM),
    map((action: fromActions.DeleteClaim) => action.payload),
    mergeMap(payload =>
      this.claimService.deleteClaim(payload.userId, payload.claimId).pipe(
        map(() => {
          return new fromActions.DeleteClaimSuccess();
        }),
        catchError(error => of(new fromActions.DeleteClaimFail(error)))
      )
    )
  );

  @Effect()
  createClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.CREATE_CLAIM),
    map((action: fromActions.CreateClaim) => action.payload),
    mergeMap(payload => {
      return this.claimService
        .createClaim(payload.userId, payload.policyId, payload.contractId)
        .pipe(
          switchMap((claim: Claim) => {
            if (claim.requestId !== undefined) {
              return [
                new fromUserRequestActions.LoadUserRequest({
                  userId: payload.userId,
                  requestId: claim.requestId,
                }),
                new fromActions.CreateClaimSuccess(claim),
              ];
            }
          }),
          catchError(error => of(new fromActions.CreateClaimFail(error)))
        );
    })
  );

  @Effect()
  updateClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPDATE_CLAIM),
    map((action: fromActions.UpdateClaim) => action.payload),
    mergeMap(payload =>
      this.claimService
        .updateClaim(payload.userId, payload.claimId)
        .pipe(
          map((claim) => {
            return new fromActions.UpdateClaimSuccess(claim);
          }),
          catchError(error => of(new fromActions.UpdateClaimFail(error))),
        ),
    ),
  );

  constructor(
    private actions$: Actions,
    private claimService: OccClaimService,
    private claimData: ClaimDataService
  ) {}
}
