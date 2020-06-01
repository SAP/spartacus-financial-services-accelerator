import { TestBed } from '@angular/core/testing';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { UserPrefillResolver } from './user-prefill-resolver';
import { Type } from '@angular/core';

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
  let userprefilResolver: UserPrefillResolver;
  let userService: MockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: UserService, useClass: MockUserService }],
    });

    userprefilResolver = TestBed.get(UserPrefillResolver as Type<
      UserPrefillResolver
    >);
    userService = TestBed.get(UserService as Type<UserService>);
  });

  it('should inject user resolver', () => {
    expect(userprefilResolver).toBeTruthy();
  });

  it('should resolve user first name', () => {
    let result;
    userprefilResolver
      .getFieldValue(mockFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(firstName);
  });
});
