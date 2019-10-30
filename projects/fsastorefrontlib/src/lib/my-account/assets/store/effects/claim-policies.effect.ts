import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OccPolicyService } from '../../../../../occ/services/policy/policy.service';
import { PolicyDataService } from '../../services/policy-data.service';
import * as fromActions from '../actions';

@Injectable()
export class ClaimPoliciesEffects {
  @Effect()
  loadClaimPolicies$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLAIM_POLICIES),
    map((action: fromActions.LoadClaimPolicies) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.policyData.userId,
          policyCategoryCode: this.policyData.policyCategoryCode,
        };
      }
      return this.policyService
        .getPoliciesByCategory(payload.userId, payload.policyCategoryCode)
        .pipe(
          map((claimPolicies: any) => {
            return new fromActions.LoadClaimPoliciesSuccess(claimPolicies);
          }),
          catchError(error => of(new fromActions.LoadClaimPoliciesFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private policyData: PolicyDataService,
    private policyService: OccPolicyService
  ) {}
}
