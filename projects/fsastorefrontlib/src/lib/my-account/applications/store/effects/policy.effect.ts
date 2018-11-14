import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { PolicyDataService } from '../../services/policy-data.service';
import { OccPolicyService } from '../../../../occ/policy/policy.service';

@Injectable()
export class PolicyEffects {
  @Effect()
  loadPolicies$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_POLICIES),
    map((action: fromActions.LoadPolicies) => action.payload),
    mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
             userId: this.policyData.userId,
             policies: this.policyData.policies
          };
        }
        return this.policyService.getPolicies(payload.userId)
          .pipe(
            map((policies: any) => {
              return new fromActions.LoadPoliciesSuccess(policies);
            }),
            catchError(error => of(new fromActions.LoadPoliciesFail(error)))
          );
      })
  );

  constructor(
    private actions$: Actions,
    private policyService: OccPolicyService,
    private policyData: PolicyDataService
  ) {}
}
