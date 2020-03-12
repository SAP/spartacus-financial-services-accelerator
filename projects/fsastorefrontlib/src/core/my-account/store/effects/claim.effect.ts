import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ClaimDataService } from '../../services/claim-data.service';
import { Claim } from '../../../../occ/occ-models';
import * as fromUserRequestActions from '../../../user-request/store/actions';
import * as fromActions from '../actions';
import { ClaimConnector } from '../../connectors/claim.connector';

@Injectable()
export class ClaimEffects {
  @Effect()
  loadClaims$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLAIMS),
    map((action: fromActions.LoadClaims) => action.payload),
    switchMap(payload => {
      return this.claimConnector.getClaims(payload.userId).pipe(
        map((claims: any) => {
          return new fromActions.LoadClaimsSuccess(claims);
        }),
        catchError(error =>
          of(new fromActions.LoadClaimsFail(JSON.stringify(error)))
        )
      );
    })
  );

  @Effect()
  removeClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.DELETE_CLAIM),
    map((action: fromActions.DeleteClaim) => action.payload),
    mergeMap(payload =>
      this.claimConnector.deleteClaim(payload.userId, payload.claimId).pipe(
        map(() => {
          return new fromActions.DeleteClaimSuccess();
        }),
        catchError(error =>
          of(new fromActions.DeleteClaimFail(JSON.stringify(error)))
        )
      )
    )
  );

  @Effect()
  createClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.CREATE_CLAIM),
    map((action: fromActions.CreateClaim) => action.payload),
    mergeMap(payload => {
      return this.claimConnector
        .createClaim(payload.userId, payload.policyId, payload.contractId)
        .pipe(
          switchMap((claim: Claim) => {
            if (claim.requestId !== undefined) {
              return [
                new fromUserRequestActions.LoadUserRequestSuccess({
                  userId: payload.userId,
                  requestId: claim.requestId,
                }),
                new fromActions.CreateClaimSuccess(claim),
              ];
            }
          }),
          catchError(error =>
            of(new fromActions.CreateClaimFail(JSON.stringify(error)))
          )
        );
    })
  );

  @Effect()
  loadCurrentClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CURRENT_CLAIM),
    map((action: fromActions.LoadCurrentClaim) => action.payload),
    switchMap(payload => {
      return this.claimConnector.getClaim(payload.userId, payload.claimId).pipe(
        map((claims: any) => {
          return new fromActions.LoadCurrentClaimSuccess(claims);
        }),
        catchError(error =>
          of(new fromActions.LoadCurrentClaimFail(JSON.stringify(error)))
        )
      );
    })
  );

  @Effect()
  updateClaim$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPDATE_CLAIM),
    map((action: fromActions.UpdateClaim) => action.payload),
    mergeMap(payload => {
      let claimID = this.claimServiceData.claimData.claimNumber;
      let claimDataWithLocation = null;
      let updateClaimData = null;

      if (
        payload.stepData.stepContent &&
        payload.stepData.stepContent.contentData
      ) {
        updateClaimData = payload.stepData.stepContent.contentData;

        if (this.claimServiceData.claimData.locationOfLoss !== undefined) {
          claimDataWithLocation = Object.assign(updateClaimData, {
            locationOfLoss: this.claimServiceData.claimData.locationOfLoss.code,
          });
        }
      }
      if (claimID === undefined && this.claimServiceData.claims !== undefined) {
        // @ts-ignore
        claimID = this.claimServiceData.claims.claims.find(
          claim => claim.requestId === payload.claimData.requestId
        ).claimNumber;
      }

      return this.claimConnector
        .updateClaim(
          payload.userId,
          claimID,
          claimDataWithLocation !== null
            ? claimDataWithLocation
            : updateClaimData
        )
        .pipe(
          mergeMap(claim => {
            return [
              new fromActions.UpdateClaimSuccess(claim),
              new fromUserRequestActions.UpdateUserRequest({
                userId: payload.userId,
                requestId: claim.requestId,
                stepData: payload.stepData,
              }),
            ];
          }),
          catchError(error =>
            of(new fromActions.UpdateClaimFail(JSON.stringify(error)))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private claimConnector: ClaimConnector,
    private claimServiceData: ClaimDataService
  ) {}
}
