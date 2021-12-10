import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConsentService } from './consent.service';
import { StateWithMyAccount } from '../store/my-account-state';
import { Store, StoreModule } from '@ngrx/store';
import { inject, TestBed } from '@angular/core/testing';
import { reducerProvider, reducerToken } from '../store/reducers';
import * as fromAction from '../store/actions';

const userId = OCC_USER_ID_CURRENT;
const customerId = 'testCustomerId';
const consentId = 'CL00001';

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('ConsentServiceTest', () => {
  let service: ConsentService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;

  beforeEach(() => {
    userIdService = new MockUserIdService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', reducerToken),
      ],
      providers: [
        ConsentService,
        reducerProvider,
        { provide: UserIdService, useValue: userIdService },
      ],
    });

    service = TestBed.inject(ConsentService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if ConsentService is injected', inject(
    [ConsentService],
    (consentService: ConsentService) => {
      expect(consentService).toBeTruthy();
    }
  ));

  it('should be able to get consents if data exists', () => {
    store.dispatch(
      new fromAction.LoadConsentsSuccess({ consentId: consentId })
    );
    let consentsResponse;
    service
      .getConsents()
      .subscribe(consents => {
        consentsResponse = consents;
      })
      .unsubscribe();
    expect(consentsResponse).toEqual({ consentId: consentId });
  });

  it('should be able to get loaded consents flag', () => {
    store.dispatch(
      new fromAction.LoadConsentsSuccess({ consentId: consentId })
    );
    let consentsLoaded;
    service
      .getConsentsLoaded()
      .subscribe(loaded => {
        consentsLoaded = loaded;
      })
      .unsubscribe();
    expect(consentsLoaded).toEqual(true);
  });

  it('should be able to load consents', () => {
    service.loadConsents(userId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadConsents({ userId: userId })
    );
  });

  it('should be able to load customer', () => {
    service.loadCustomer(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomer({ userId: userId, customerId: customerId })
    );
  });

  it('should be able to load customer quotes', () => {
    service.loadCustomerQuotes(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerQuotes({
        userId: userId,
        customerId: customerId,
      })
    );
  });

  it('should be able to load customer policies', () => {
    service.loadCustomerPolicies(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerPolicies({
        userId: userId,
        customerId: customerId,
      })
    );
  });

  it('should be able to load customer claims', () => {
    service.loadCustomerClaims(userId, customerId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadCustomerClaims({
        userId: userId,
        customerId: customerId,
      })
    );
  });
});
