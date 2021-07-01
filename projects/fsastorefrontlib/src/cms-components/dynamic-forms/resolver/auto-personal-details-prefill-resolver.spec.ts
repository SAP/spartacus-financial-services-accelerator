import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import { FSUser } from '../../../occ/occ-models/occ.models';
import { AutoPersonalDetailsPrefillResolver } from './auto-personal-details-prefill-resolver';
import { UserAccountFacade } from '@spartacus/user/account/root';

const mockUser: FSUser = {
  dateOfBirth: '1991-12-29',
};
class MockCartService {
  getActive() {}
  isStable() {
    return of(true);
  }
}
class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('AutoPersonalDetailsPrefillResolver', () => {
  let userPrefilResolver: AutoPersonalDetailsPrefillResolver;
  let userAccountFacade: UserAccountFacade;
  let cartService: FSCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: FSCartService, useClass: MockCartService },
      ],
    });

    userPrefilResolver = TestBed.inject(AutoPersonalDetailsPrefillResolver);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    cartService = TestBed.inject(FSCartService);
    spyOn(userAccountFacade, 'get').and.returnValues(of(mockUser));
  });

  it('should inject user resolver', () => {
    expect(userPrefilResolver).toBeTruthy();
  });

  it('should resolve user dateOfBirth', () => {
    let result;
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          customerId: 'true',
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
          customerId: 'false',
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
