import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { of } from 'rxjs';
import { UserPrefillResolver } from './user-prefill-resolver';

const firstName = 'Donna';
const lastName = 'Moore';

const mockUser = {
  firstName: firstName,
  lastName: lastName,
};

class MockUserService {
  get() {
    return of(mockUser);
  }
}

const mockFieldPath = 'firstName';

describe('UserPrefilResolver', () => {
  let userPrefilResolver: UserPrefillResolver;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: UserService, useClass: MockUserService }],
    });

    userPrefilResolver = TestBed.inject(UserPrefillResolver);
    userService = TestBed.inject(UserService);
  });

  it('should inject user resolver', () => {
    expect(userPrefilResolver).toBeTruthy();
  });

  it('should resolve user first name', () => {
    let result;
    userPrefilResolver
      .getFieldValue(mockFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(firstName);
  });
});
