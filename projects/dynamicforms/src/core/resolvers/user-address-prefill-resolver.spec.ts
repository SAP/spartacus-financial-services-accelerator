import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, UserAddressService } from '@spartacus/core';
import { of } from 'rxjs';
import { UserAddressPrefillResolver } from './user-address-prefill-resolver';

const firstName = 'Donna';
const lastName = 'Moore';
const street = 'Omladinskih brigada';
const streetNumber = '2';

const mockAddress = [
  {
    firstName: firstName,
    lastName: lastName,
    line1: street,
    line2: streetNumber,
  },
];
class MockUserAddressService {
  getAddresses() {
    return of(mockAddress);
  }
}
const mockFieldPath = 'line1';

describe('UserAddressPrefillResolver', () => {
  let userAddressesPrefillResolver: UserAddressPrefillResolver;
  let userAddressService: UserAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
      ],
    });

    userAddressesPrefillResolver = TestBed.inject(UserAddressPrefillResolver);
    userAddressService = TestBed.inject(UserAddressService);
  });

  it('should inject user address resolver', () => {
    expect(userAddressesPrefillResolver).toBeTruthy();
  });

  it('should resolve address line', () => {
    userAddressesPrefillResolver
      .getPrefillValue(mockFieldPath)
      .subscribe(value => {
        expect(value).toEqual(street);
      })
      .unsubscribe();
  });

  it('should resolve undefined address line', () => {
    spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));
    userAddressesPrefillResolver
      .getPrefillValue(mockFieldPath)
      .subscribe(value => {
        expect(value).toEqual(' ');
      })
      .unsubscribe();
  });
});
