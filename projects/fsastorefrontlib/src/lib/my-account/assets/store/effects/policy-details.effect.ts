import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccPolicyService } from '../../../../occ/policy/policy.service';
import * as fromActions from './../actions';

@Injectable()
export class PolicyDetailsEffects {
  constructor(
    private actions$: Actions,
    private occPolicyService: OccPolicyService,
  ) {}

  @Effect()
  loadPolicyDetails$: Observable<any> = 
  this.actions$.pipe(
    ofType(fromActions.LOAD_POLICY_DETAILS),
    map((action: fromActions.LoadPolicyDetails) => action.payload),
    switchMap(payload => {
      return this.occPolicyService
        .getPolicy(payload.userId, payload.policyId, payload.contractId)
        .pipe(
            map((policy: any) => {
              return new fromActions.LoadPolicyDetailsSuccess(policy);
            }),
            catchError(error => of(new fromActions.LoadPolicyDetailsFail(error)))
          );
    })
  );
}
