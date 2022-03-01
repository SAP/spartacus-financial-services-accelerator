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
import * as fromAction from '../store/actions';
import {
  ChangeRequestsState,
  CHANGE_REQUEST_FEATURE,
  StateWithChangeRequest,
} from '../store/change-request-state';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  ChangeRequestsState
> = createFeatureSelector<ChangeRequestsState>(CHANGE_REQUEST_FEATURE);

/**
 * Change Request state synced to browser storage.
 */
export type SyncedChangeRequestState = Partial<ChangeRequestsState>;
/**
 * Responsible for storing Change Request state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class ChangeRequestPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithChangeRequest>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'changeRequests';

  protected requestId = 'requestId';
  protected requestStatus = 'requestStatus';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getChangeRequestData(),
        onRead: state => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getChangeRequestData(): Observable<any> {
    return this.store.pipe(
      select(getChangeRequestState),
      filter(state => !!state),
      map(state => {
        return {
          requestId: state.changeRequest.value.content[this.requestId],
          requestStatus: state.changeRequest.value.content[this.requestStatus],
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: any) {
    if (state && state[this.requestId]) {
      this.store.dispatch(new fromAction.LoadChangeRequestSuccess(state));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
