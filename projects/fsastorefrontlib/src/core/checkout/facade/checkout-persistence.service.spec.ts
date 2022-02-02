import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import {
  FSCheckoutDataState,
  StateWithFSCheckout,
} from '../store/checkout-state';
import * as fromReducers from './../store/reducers/index';
import * as fromActions from '../store/actions/index';
import { CheckoutPersistenceService } from './checkout-persistance.service';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

const fsCheckout = 'fscheckout';
const mockCheckoutState: FSCheckoutDataState = {
  legalInformation: true,
  identificationType: false,
  paymentType: '',
};
const initialState = {
  legalInformation: false,
  identificationType: false,
  paymentType: '',
};

describe('CheckoutPersistenceService', () => {
  let service: CheckoutPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.SetLegalInformationSuccess });
  let store: Store<StateWithFSCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(fsCheckout, fromReducers.getReducers()),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        CheckoutPersistenceService,
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(CheckoutPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(Store);
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

  it('should read state', () => {
    service['onRead'](mockCheckoutState);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
