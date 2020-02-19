import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ChangeRequestService {
  constructor(
    protected store: Store<fromReducer.ChangeRequestState>,
    protected authService: AuthService
  ) {}

  createChangeRequest(policyId: string, contractId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.CreateChangeRequest({
            userId: occUserId,
            policyId: policyId,
            contractId: contractId,
          })
        );
      })
      .unsubscribe();
  }

  getChangeRequest(): Observable<any> {
    return this.store.select(fromSelector.getChangeRequest);
  }
}
