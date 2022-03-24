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
  StateWithUserRequest,
  UserRequestState,
  USER_REQUEST_FEATURE,
} from '../store/user-request-state';
import { UserRequestPersistenceService } from './user-request-persistance.service';

export const getUserRequestState: MemoizedSelector<
  StateWithUserRequest,
  UserRequestState
> = createFeatureSelector<UserRequestState>(USER_REQUEST_FEATURE);
const mockUserRequest = {
  content: {
    requestId: '0000001',
    requestStatus: 'OPEN',
    configurationSteps: [],
  },
  loaded: true,
};
const mockUserRequestState = { [USER_REQUEST_FEATURE]: mockUserRequest };

describe('UserRequestPersistenceService', () => {
  let service: UserRequestPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.UpdateUserRequestSuccess });
  let store: MockStore<StateWithUserRequest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          USER_REQUEST_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        UserRequestPersistenceService,
        StatePersistenceService,
      ],
    });
    service = TestBed.inject(UserRequestPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(MockStore);
    store.setState(mockUserRequestState);
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

  it('should get user request', () => {
    service['getUserRequest']()
      .subscribe(state => expect(state.claimNumber).toBe('0000001'))
      .unsubscribe();
  });

  it('should read state', () => {
    service['onRead'](mockUserRequest.content);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = service['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
