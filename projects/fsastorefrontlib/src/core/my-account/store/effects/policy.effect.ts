import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { PolicyConnector } from '../../services/policy/connectors/policy.connector';

@Injectable()
export class PolicyEffects {
  @Effect()
  loadPolicies$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_POLICIES),
    map((action: fromActions.LoadPolicies) => action.payload),
    switchMap(payload => {
      return this.policyConnector.getPolicies(payload.userId).pipe(
        map((policies: any) => {
          return new fromActions.LoadPoliciesSuccess(policies);
        }),
        catchError(error =>
          of(new fromActions.LoadPoliciesFail(JSON.stringify(error)))
        )
      );
    })
  );
  @Effect()
  loadPolicyDetails$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_POLICY_DETAILS),
    map((action: fromActions.LoadPolicyDetails) => action.payload),
    switchMap(payload => {
      return this.policyConnector
        .getPolicy(payload.userId, payload.policyId, payload.contractId)
        .pipe(
          map((policy: any) => {
            return new fromActions.LoadPolicyDetailsSuccess(policy);
          }),
          catchError(error =>
            of(new fromActions.LoadPolicyDetailsFail(JSON.stringify(error)))
          )
        );
    })
  );
  @Effect()
  loadPremiumCalendar$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_PREMIUM_CALENDAR),
    map((action: fromActions.LoadPremiumCalendar) => action.payload),
    switchMap(payload => {
      return this.policyConnector.getPremiumCalendar(payload.userId).pipe(
        map((premiumCalendar: any) => {
          return new fromActions.LoadPremiumCalendarSuccess(premiumCalendar);
        }),
        catchError(error =>
          of(new fromActions.LoadPremiumCalendarFail(JSON.stringify(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private policyConnector: PolicyConnector
  ) {}
}
