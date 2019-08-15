import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
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
  @Effect()
  loadPolicyDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_POLICY_DETAILS),
    map((action: fromActions.LoadPolicyDetails) => action.payload),
    switchMap(payload => {
      return this.policyService
        .getPolicy(payload.userId, payload.policyId, payload.contractId)
        .pipe(
            map((policy: any) => {
              return new fromActions.LoadPolicyDetailsSuccess(policy);
            }),
            catchError(error => of(new fromActions.LoadPolicyDetailsFail(error)))
          );
    })
  );
  @Effect()
  loadPremiumCalendar$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_PREMIUM_CALENDAR),
    map((action: fromActions.LoadPremiumCalendar) => action.payload),
    mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
             userId: this.policyData.userId,
             policies: this.policyData.policies
          };
        }
        return this.policyService.getPremiumCalendar(payload.userId)
          .pipe(
            map((premiumCalendar: any) => {
              return new fromActions.LoadPremiumCalendarSuccess(premiumCalendar);
            }),
            catchError(error => of(new fromActions.LoadPremiumCalendarFail(error)))
          );
      })
  );

  constructor(
    private actions$: Actions,
    private policyData: PolicyDataService,
    private policyService: OccPolicyService
  ) {}
}
