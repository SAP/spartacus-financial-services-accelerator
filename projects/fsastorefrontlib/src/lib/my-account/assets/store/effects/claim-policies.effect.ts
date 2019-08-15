import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import * as fromActions from '../actions';
import { PolicyDataService } from '../../services/policy-data.service';
import { OccPolicyService } from '../../../../occ/policy/policy.service';

@Injectable()
export class ClaimPoliciesEffects {
  @Effect()
  loadClaimPolicies$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CLAIM_POLICIES),
    map((action: fromActions.LoadClaimPolicies) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
            userId: this.claimPoliciesData.userId,
            claimsCategoryCode: this.claimPoliciesData.claimsCategoryCode
        };
      }
      return this.claimPoliciesService.getPoliciesByCategory(payload.userId, payload.claimsCategoryCode)
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
    private claimPoliciesData: PolicyDataService,
    private claimPoliciesService: OccPolicyService
  ) {}
}
