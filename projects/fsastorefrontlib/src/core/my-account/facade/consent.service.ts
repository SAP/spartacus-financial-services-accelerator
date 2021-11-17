import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as fromAction from './../store/actions';
import { StateWithMyAccount } from '../store/my-account-state';
import { select, Store } from '@ngrx/store';
import * as fromConsentStore from './../store';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ConsentService {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected userIdService: UserIdService
  ) {}

  loadConsents() {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.LoadConsents({
            userId: occUserId,
          })
        );
      })
      .unsubscribe();
  }

  getConsents(): Observable<any> {
    return this.store.pipe(select(fromConsentStore.getConsents));
  }

  getConsentsLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromConsentStore.getConsentsLoaded));
  }
}
