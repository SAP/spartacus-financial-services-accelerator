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
import { MyAccountPersistenceService } from './my-account-persistance.service';
import {
  MyAccountState,
  MY_ACCOUNT_FEATURE,
  StateWithMyAccount,
} from '../store/my-account-state';

export const getMyAccountState: MemoizedSelector<
  StateWithMyAccount,
  MyAccountState
> = createFeatureSelector<MyAccountState>(MY_ACCOUNT_FEATURE);
const mockMyAccount = {
  quotes: {
    quotes: [],
    quoteDetails: {},
    quotesComparison: {},
    loaded: false,
  },
  policies: {
    policies: [],
    policyDetails: {},
    loaded: false,
  },
  premiumCalendar: {
    data: {},
    loaded: false,
  },
  claimPolicies: {
    claimPoliciesData: {
      insurancePolicies: [],
    },
    loaded: false,
  },
  consents: {
    consents: {},
    customer: {},
    customerQuotes: [],
    customerPolicies: {},
    customerClaims: {},
    loaded: false,
  },
  claims: {
    claims: {},
    refresh: false,
    loaded: true,
    content: {
      claimNumber: '0000001',
      claimStatus: 'OPEN',
      configurationSteps: [],
    },
  },
};
const mockMyAccountState = { [MY_ACCOUNT_FEATURE]: mockMyAccount };

describe('MyAccountPersistenceService', () => {
  let service: MyAccountPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.LoadClaimByIdSuccess });
  let store: MockStore<StateWithMyAccount>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(MY_ACCOUNT_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        MyAccountPersistenceService,
        StatePersistenceService,
      ],
    });
    service = TestBed.inject(MyAccountPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(MockStore);
    store.setState(mockMyAccountState);
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

  it('should get claim content', () => {
    service['getClaimContent']()
      .subscribe(state => expect(state.claimNumber).toBe('0000001'))
      .unsubscribe();
  });

  it('should read state', () => {
    service['onRead'](mockMyAccount.claims.content);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = service['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
