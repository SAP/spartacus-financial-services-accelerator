import { Injectable, OnDestroy } from '@angular/core';
import {
  createFeatureSelector,
  MemoizedSelector,
  select,
  Store,
} from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  MyAccountState,
  MY_ACCOUNT_FEATURE,
  StateWithMyAccount,
} from '../store/my-account-state';
import { StatePersistenceService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import * as fromAction from '../store/actions';

export const getMyAccountState: MemoizedSelector<
  StateWithMyAccount,
  MyAccountState
> = createFeatureSelector<MyAccountState>(MY_ACCOUNT_FEATURE);

/**
 * My account state synced to browser storage.
 */
export type SyncedMyAccountState = Partial<MyAccountState>;

/**
 * Responsible for storing My account state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class MyAccountPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithMyAccount>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'claims';

  protected claimNumber = 'claimNumber';
  protected claimStatus = 'claimStatus';
  protected configurationSteps = 'configurationSteps';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getClaimContent(),
        onRead: state => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the claim that should
   * be saved in storage.
   */
  protected getClaimContent(): Observable<any> {
    return this.store.pipe(
      select(getMyAccountState),
      filter(state => !!state?.claims?.content),
      map(state => {
        return {
          claimNumber: state.claims.content[this.claimNumber],
          claimStatus: state.claims.content[this.claimStatus],
          configurationSteps: state.claims.content[this.configurationSteps],
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: any) {
    if (state && state[this.claimNumber]) {
      this.store.dispatch(new fromAction.LoadClaimByIdSuccess(state));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
