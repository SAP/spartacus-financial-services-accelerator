import { TestBed } from '@angular/core/testing';
import {
  createFeatureSelector,
  MemoizedSelector,
  StoreModule,
} from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import {
  FSCheckoutState,
  FS_CHECKOUT_FEATURE,
  StateWithFSCheckout,
} from '../store/checkout-state';
import * as fromReducers from './../store/reducers/index';
import * as fromActions from '../store/actions/index';
import { CheckoutPersistenceService } from './checkout-persistance.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

export const getCheckoutState: MemoizedSelector<
  StateWithFSCheckout,
  FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(FS_CHECKOUT_FEATURE);
const mockCheckout = {
  fscheckout: {
    legalInformation: true,
    identificationType: false,
    paymentType: '',
  },
};
const mockCheckoutState = { [FS_CHECKOUT_FEATURE]: mockCheckout };

describe('CheckoutPersistenceService', () => {
  let service: CheckoutPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.SetLegalInformationSuccess });
  let store: MockStore<StateWithFSCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(FS_CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        CheckoutPersistenceService,
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(CheckoutPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(MockStore);
    store.setState(mockCheckoutState);
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

  it('should get checkout content', () => {
    service['getCheckoutContent']()
      .subscribe(state => expect(state.legalInformation).toBe(true))
      .unsubscribe();
  });

  it('should read state', () => {
    service['onRead'](mockCheckout.fscheckout);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = service['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
