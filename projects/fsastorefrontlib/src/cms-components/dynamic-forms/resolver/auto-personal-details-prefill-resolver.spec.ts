import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { of } from 'rxjs';
import { AutoPersonalDetailsPrefillResolver } from './auto-personal-details-prefill-resolver';
import { FSUser } from '../../../occ/occ-models/occ.models';
import { FSCartService } from '../../../core/cart/facade/cart.service';

const mockUser: FSUser = {
  dateOfBirth: '1991-12-29',
};
class MockCartService {
  getActive() {}
  isStable() {
    return of(true);
  }
}
class MockUserService {
  get() {
    return of(mockUser);
  }
}

describe('AutoPersonalDetailsPrefillResolver', () => {
  let userPrefilResolver: AutoPersonalDetailsPrefillResolver;
  let userService: UserService;
  let cartService: FSCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: FSCartService, useClass: MockCartService },
      ],
    });

    userPrefilResolver = TestBed.inject(AutoPersonalDetailsPrefillResolver);
    userService = TestBed.inject(UserService);
    cartService = TestBed.inject(FSCartService);
    spyOn(userService, 'get').and.returnValues(of(mockUser));
  });

  it('should inject user resolver', () => {
    expect(userPrefilResolver).toBeTruthy();
  });

  it('should resolve user dateOfBirth', () => {
    let result;
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          policyHolderSameAsMainDriver: 'true',
        },
      },
    };
    spyOn(cartService, 'getActive').and.returnValues(of(mockCart));
    userPrefilResolver
      .getPrefillValue('dateOfBirth')
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(mockUser.dateOfBirth);
  });

  it('should not resolve user dateOfBirth when policyHolderSameAsMainDriver is set to false', () => {
    let result;
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          policyHolderSameAsMainDriver: 'false',
        },
      },
    };
    spyOn(cartService, 'getActive').and.returnValues(of(mockCart));
    userPrefilResolver
      .getPrefillValue('dateOfBirth')
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(undefined);
  });
});
