import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { UserPrefillResolver } from './user-prefill-resolver';
import { UserAccountFacade } from '@spartacus/user/account/root';

const firstName = 'Donna';
const lastName = 'Moore';

const mockUser = {
  firstName: firstName,
  lastName: lastName,
};

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

const mockFieldPath = 'firstName';

describe('UserPrefilResolver', () => {
  let userPrefilResolver: UserPrefillResolver;
  let userAccountFacade: UserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    userPrefilResolver = TestBed.inject(UserPrefillResolver);
    userAccountFacade = TestBed.inject(UserAccountFacade);
  });

  it('should inject user resolver', () => {
    expect(userPrefilResolver).toBeTruthy();
  });

  it('should resolve user first name', () => {
    let result;
    userPrefilResolver
      .getPrefillValue(mockFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(firstName);
  });
});
