import { Injectable, OnDestroy } from '@angular/core';
import {
  createFeatureSelector,
  MemoizedSelector,
  select,
  Store,
} from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StatePersistenceService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import * as fromFSAction from '../store/actions/index';
import {
  FSCheckoutDataState,
  FSCheckoutState,
  FS_CHECKOUT_FEATURE,
  StateWithFSCheckout,
} from '../store/checkout-state';

export const getCheckoutState: MemoizedSelector<
  StateWithFSCheckout,
  FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(FS_CHECKOUT_FEATURE);

/**
 * Responsible for storing Checkout state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithFSCheckout>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'fscheckout';

  protected legalInformation = 'legalInformation';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getCheckoutContent(),
        onRead: state => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the checkout that should
   * be saved in storage.
   */
  protected getCheckoutContent(): Observable<any> {
    return this.store.pipe(
      select(getCheckoutState),
      map(state => {
        return {
          legalInformation: state.fscheckout.legalInformation,
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: FSCheckoutDataState) {
    if (state && state[this.legalInformation]) {
      this.store.dispatch(new fromFSAction.SetLegalInformationSuccess(state));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
