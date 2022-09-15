import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { PolicyConnector } from '../../connectors/policy.connector';

@Injectable()
export class PolicyEffects {
  loadPolicies$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  loadPolicyDetails$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  /**
   * @deprecated since version 4.0.2
   * Use connector directly, as we remove store for this feature.
   */
  loadPremiumCalendar$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  constructor(
    private actions$: Actions,
    private policyConnector: PolicyConnector
  ) {}
}
