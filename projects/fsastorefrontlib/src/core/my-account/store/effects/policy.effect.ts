import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccPolicyAdapter } from '../../../../occ/services/policy/occ-policy.adapter';
import * as fromActions from '../actions';

@Injectable()
export class PolicyEffects {
  @Effect()
  loadPolicies$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_POLICIES),
    map((action: fromActions.LoadPolicies) => action.payload),
    switchMap(payload => {
      return this.policyService.getPolicies(payload.userId).pipe(
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
    switchMap(payload => {
      return this.policyService.getPremiumCalendar(payload.userId).pipe(
        map((premiumCalendar: any) => {
          return new fromActions.LoadPremiumCalendarSuccess(premiumCalendar);
        }),
        catchError(error => of(new fromActions.LoadPremiumCalendarFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private policyService: OccPolicyAdapter
  ) {}
}
