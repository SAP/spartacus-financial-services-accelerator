import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, User, UserAddressService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { FSUserAddressPrefillResolver } from './user-address-prefill-resolver';
import { FSUserRole } from '../../../occ/occ-models/occ.models';

const mockAddress = [
  {
    firstName: 'testFirstName',
    lastName: 'testLastName',
    line1: 'street',
    line2: 'streetNumber',
  },
];
const mockFieldPath = 'line1';

const mockUser: User = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  roles: [],
};

class MockUserAddressService {
  getAddresses() {
    return of(mockAddress);
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('FSUserAddressPrefillResolver', () => {
  let userAddressesPrefillResolver: FSUserAddressPrefillResolver;
  let userAddressService: UserAddressService;
  let userAccountFacade: MockUserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    userAddressesPrefillResolver = TestBed.inject(FSUserAddressPrefillResolver);
    userAddressService = TestBed.inject(UserAddressService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
  });

  it('should inject user address resolver', () => {
    expect(userAddressesPrefillResolver).toBeTruthy();
  });

  it('should resolve address line', () => {
    userAddressesPrefillResolver
      .getPrefillValue(mockFieldPath)
      .subscribe(value => {
        expect(value).toEqual('street');
      })
      .unsubscribe();
  });

  it('should not resolve field value when currently logged in customer is from seller user group', () => {
    const sellerUser = {
      roles: [FSUserRole.SELLER],
    };
    spyOn(userAccountFacade, 'get').and.returnValue(of(sellerUser));
    let result;
    userAddressesPrefillResolver
      .getPrefillValue(mockFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(undefined);
  });
});
