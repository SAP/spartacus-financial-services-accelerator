import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { PolicyDataService } from '../../services/policy-data.service';
import { OccPolicyService } from 'projects/fsastorefrontlib/src/lib/occ/policy/policy.service';

@Injectable()
export class PremiumCalendarEffects {
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
    private policyService: OccPolicyService,
    private policyData: PolicyDataService
  ) {}
}
