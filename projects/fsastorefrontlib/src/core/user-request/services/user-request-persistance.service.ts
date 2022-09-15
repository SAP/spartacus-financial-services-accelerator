import { Injectable, OnDestroy } from '@angular/core';
import {
  createFeatureSelector,
  MemoizedSelector,
  select,
  Store,
} from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  StateWithUserRequest,
  UserRequestState,
  USER_REQUEST_FEATURE,
} from '../store/user-request-state';
import * as fromAction from '../store/actions';

export const getUserRequestState: MemoizedSelector<
  StateWithUserRequest,
  UserRequestState
> = createFeatureSelector<UserRequestState>(USER_REQUEST_FEATURE);

/**
 * User request state synced to browser storage.
 */
export type SyncedUserRequestState = Partial<UserRequestState>;

/**
 * Responsible for storing User request state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRequestPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithUserRequest>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'userRequest';

  protected requestStatus = 'requestStatus';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getUserRequest(),
        onRead: state => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the user request that should
   * be saved in storage.
   */
  protected getUserRequest(): Observable<any> {
    return this.store.pipe(
      select(getUserRequestState),
      filter(state => !!state),
      map(state => {
        return {
          userRequest: {
            content: {
              requestStatus:
                state[USER_REQUEST_FEATURE]?.content[this.requestStatus],
            },
          },
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: any) {
    if (state) {
      this.store.dispatch(new fromAction.UpdateUserRequestSuccess(state));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
