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
import { FormsState, FORM_FEATURE, StateWithForm } from '../store/state';
import * as fromAction from '../store/actions';

export const getFormsState: MemoizedSelector<
  StateWithForm,
  FormsState
> = createFeatureSelector<FormsState>(FORM_FEATURE);

/**
 * Forms state synced to browser storage.
 */
export type SyncedFormsState = Partial<FormsState>;
/**
 * Responsible for storing Form state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
@Injectable({
  providedIn: 'root',
})
export class FormPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithForm>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'form';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getUploadedFiles(),
        onRead: state => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getUploadedFiles(): Observable<{ files: File[] }> {
    return this.store.pipe(
      select(getFormsState),
      filter(state => !!state),
      map(state => {
        return {
          files: state.uploadedFiles.content.files,
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: { files: File[] }) {
    if (state) {
      this.store.dispatch(new fromAction.SetUploadedFiles(state.files));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
