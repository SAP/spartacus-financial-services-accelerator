import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConsentService } from './consent.service';
import { StateWithMyAccount } from '../store/my-account-state';
import { Store, StoreModule } from '@ngrx/store';
import { inject, TestBed } from '@angular/core/testing';
import { reducerProvider, reducerToken } from '../store/reducers';
import * as fromAction from '../store/actions';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FSCart, FSUser, FSUserRole } from '../../../occ/occ-models/occ.models';

const userId = OCC_USER_ID_CURRENT;
const consentId = 'CL00001';
const mockUser: FSUser = {
  firstName: 'Donna',
  lastName: 'Moore',
  roles: [FSUserRole.SELLER],
};
const mockOBOCustomer: FSUser = {
  uid: 'customerToTransferCartTo',
};
const mockCart: FSCart = {
  code: 'cartCode',
};
class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('ConsentServiceTest', () => {
  let service: ConsentService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;
  let mockedUserAccountFacade: UserAccountFacade;

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
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
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

  it('should transfer cart to selected obo customer', () => {
    service.setSelectedOBOCustomer(mockUser);
    service.transferCartToSelectedOBOCustomer(
      mockCart,
      mockUser,
      mockOBOCustomer
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.TransferCart({
        cart: mockCart,
        consentHolder: mockUser,
        oboCustomer: mockOBOCustomer,
      })
    );
  });

  it('should allow cart transfer for the seller', () => {
    service.setSelectedOBOCustomer(mockOBOCustomer);
    service
      .isCartTransferAllowedForSeller()
      .subscribe(result => expect(result).toEqual(true))
      .unsubscribe();
  });

  it('should not allow cart transfer', () => {
    service.setSelectedOBOCustomer({});
    service
      .isCartTransferAllowedForSeller()
      .subscribe(result => expect(result).toEqual(false))
      .unsubscribe();
  });

  it('should select customer for cart transfer', () => {
    service.setSelectedOBOCustomer(mockOBOCustomer);
    service
      .getSelectedOBOCustomer()
      .subscribe(selectedCustomer =>
        expect(selectedCustomer.uid).toEqual(mockOBOCustomer.uid)
      )
      .unsubscribe();
  });
});
