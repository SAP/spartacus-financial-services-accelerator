import { TestBed } from '@angular/core/testing';
import {
  createFeatureSelector,
  MemoizedSelector,
  StoreModule,
} from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import * as fromReducers from '../store/reducers/index';
import * as fromActions from '../store/actions/index';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  ChangeRequestsState,
  CHANGE_REQUEST_FEATURE,
  StateWithChangeRequest,
} from '../store/change-request-state';
import { ChangeRequestPersistenceService } from './change-request-persistence.service';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  ChangeRequestsState
> = createFeatureSelector<ChangeRequestsState>(CHANGE_REQUEST_FEATURE);
const mockChangeRequest = {
  changeRequest: {
    value: {
      content: {
        requestId: '0000001',
        requestStatus: 'OPEN',
      },
      loaded: true,
    },
  },
};
const mockChangeRequestState = { [CHANGE_REQUEST_FEATURE]: mockChangeRequest };

describe('ChangeRequestPersistenceService', () => {
  let service: ChangeRequestPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.LoadChangeRequestSuccess });
  let store: MockStore<StateWithChangeRequest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CHANGE_REQUEST_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        ChangeRequestPersistenceService,
        StatePersistenceService,
      ],
    });
    service = TestBed.inject(ChangeRequestPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(MockStore);
    store.setState(mockChangeRequestState);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should sync state with storage', () => {
    service.initSync();
    expect(persistenceService.syncWithStorage).toHaveBeenCalled();
  });

  it('should get change request', () => {
    service['getChangeRequestData']()
      .subscribe(state => expect(state.requestId).toBe('0000001'))
      .unsubscribe();
  });

  it('should read state', () => {
    service['onRead'](mockChangeRequest.changeRequest.value.content);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = service['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
