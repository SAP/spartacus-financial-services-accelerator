import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ClaimDataService } from '../../services/claim-data.service';
import { Claim } from '../../../../occ/occ-models';
import * as fromUserRequestActions from '../../../user-request/store/actions';
import * as fromActions from '../actions';
import { ClaimConnector } from '../../connectors/claim.connector';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';

@Injectable()
export class ClaimEffects {
  loadClaims$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  removeClaim$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  createClaim$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
            catchError(error => {
              this.showGlobalMessage(
                'claim.createFailed',
                GlobalMessageType.MSG_TYPE_ERROR
              );
              return of(new fromActions.CreateClaimFail(JSON.stringify(error)));
            })
          );
      })
    )
  );

  loadClaimById$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CLAIM_BY_ID),
      map((action: fromActions.LoadClaimById) => action.payload),
      switchMap(payload => {
        return this.claimConnector
          .getClaim(payload.userId, payload.claimId)
          .pipe(
            map((claims: any) => {
              return new fromActions.LoadClaimByIdSuccess(claims);
            }),
            catchError(error => {
              this.showGlobalMessage(
                'claim.loadingFailed',
                GlobalMessageType.MSG_TYPE_ERROR
              );
              this.routingService.go({ cxRoute: 'home' });
              return of(
                new fromActions.LoadClaimByIdFail(JSON.stringify(error))
              );
            })
          );
      })
    )
  );

  updateClaim$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
          updateClaimData = { ...payload.stepData.stepContent.contentData };
          if (payload.claimData?.documents) {
            Object.assign(updateClaimData, {
              documents: payload.claimData.documents,
            });
          }
          if (this.claimServiceData.claimData.locationOfLoss !== undefined) {
            claimDataWithLocation = Object.assign(updateClaimData, {
              locationOfLoss: this.claimServiceData.claimData.locationOfLoss
                .code,
            });
          }
        }
        if (
          claimID === undefined &&
          this.claimServiceData.claims !== undefined
        ) {
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
    )
  );

  private showGlobalMessage(text: string, messageType: GlobalMessageType) {
    this.globalMessageService.remove(messageType);
    this.globalMessageService.add({ key: text }, messageType);
  }

  constructor(
    private actions$: Actions,
    private claimConnector: ClaimConnector,
    private claimServiceData: ClaimDataService,
    private globalMessageService: GlobalMessageService,
    private routingService: RoutingService
  ) {}
}
