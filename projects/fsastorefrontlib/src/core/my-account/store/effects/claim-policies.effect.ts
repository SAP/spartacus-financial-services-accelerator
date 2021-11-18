import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { PolicyConnector } from '../../connectors/policy.connector';

@Injectable()
export class ClaimPoliciesEffects {
  loadClaimPolicies$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CLAIM_POLICIES),
      map((action: fromActions.LoadClaimPolicies) => action.payload),
      switchMap(payload => {
        return this.policyConnector
          .getPoliciesByCategory(payload.userId, payload.policyCategoryCode)
          .pipe(
            map((claimPolicies: any) => {
              return new fromActions.LoadClaimPoliciesSuccess(claimPolicies);
            }),
            catchError(error =>
              of(new fromActions.LoadClaimPoliciesFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private policyConnector: PolicyConnector
  ) {}
}
