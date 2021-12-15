import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, User } from '@spartacus/core';
import { of } from 'rxjs';
import { FSUserPrefillResolver } from './user-prefill-resolver';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FSUserRole } from '@spartacus/fsa-storefront';

const mockUser: User = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  roles: [],
};

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('FSUserPrefillResolver', () => {
  let userPrefilResolver: FSUserPrefillResolver;
  let mockedUserAccountFacade: MockUserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    userPrefilResolver = TestBed.inject(FSUserPrefillResolver);
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
  });

  it('should inject user resolver', () => {
    expect(userPrefilResolver).toBeTruthy();
  });

  it('should resolve field value', () => {
    let result;
    userPrefilResolver
      .getPrefillValue('firstName')
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(mockUser.firstName);
  });

  it('should not resolve field value when currently logged in customer is from seller user group', () => {
    const sellerUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      roles: [FSUserRole.SELLER],
    };
    spyOn(mockedUserAccountFacade, 'get').and.returnValue(of(sellerUser));
    let result;
    userPrefilResolver
      .getPrefillValue('testField')
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(undefined);
  });
});
