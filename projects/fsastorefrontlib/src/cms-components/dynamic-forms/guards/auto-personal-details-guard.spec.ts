import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RoutingService,
  UserService,
  GlobalMessageService,
} from '@spartacus/core';
import { AutoPersonalDetailsGuard } from './auto-personal-details-guard';
import { FSUser } from '../../../occ/occ-models/occ.models';
import { of } from 'rxjs';
import { FormsUtils } from '../utils/forms-utils';
import { FSCartService } from '../../../core/cart/facade/cart.service';
import createSpy = jasmine.createSpy;

const mockUser: FSUser = {
  dateOfBirth: '1991-12-29',
};

class MockRoutingService {
  go = createSpy('redirectToHomepage');
}
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
class MockFormsSharedService {
  convertIfDate(date) {
    return date;
  }
}
class MockGlobalMessageService {
  add(arg) {}
}

describe('AutoPersonalDetailsGuard', () => {
  let guard: AutoPersonalDetailsGuard;
  let routingService: RoutingService;
  let cartService: FSCartService;
  let userService: UserService;
  let formsSharedService: FormsUtils;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: FSCartService, useClass: MockCartService },
        { provide: UserService, useClass: MockUserService },
        { provide: FormsUtils, useClass: MockFormsSharedService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    guard = TestBed.inject(AutoPersonalDetailsGuard);
    routingService = TestBed.inject(RoutingService);
    cartService = TestBed.inject(FSCartService);
    userService = TestBed.inject(UserService);
    formsSharedService = TestBed.inject(FormsUtils);
    globalMessageService = TestBed.inject(GlobalMessageService);
    spyOn(cartService, 'isStable').and.returnValues(of(true));
    spyOn(userService, 'get').and.returnValues(of(mockUser));
  });

  it('should redirect to homepage in case policyHolderSameAsMainDriver is set to true and DOBs are not the same', () => {
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          entry: [
            {
              key: 'policyHolderSameAsMainDriver',
              value: 'true',
            },
            { key: 'dateOfBirth', value: '29-01-1990' },
          ],
        },
      },
    };
    spyOn(cartService, 'getActive').and.returnValues(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(res => {
        result = res;
      })
      .unsubscribe();
    expect(result).toEqual(false);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect to homepage in case policyHolderSameAsMainDriver is set to false', () => {
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          entry: [
            {
              key: 'policyHolderSameAsMainDriver',
              value: 'false',
            },
            { key: 'dateOfBirth', value: '29-01-1990' },
          ],
        },
      },
    };
    spyOn(cartService, 'getActive').and.returnValues(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(res => {
        result = res;
      })
      .unsubscribe();
    expect(result).toEqual(true);
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not redirect to homepage in case policyHolderSameAsMainDriver is set to true and DOBs are same', () => {
    const mockCart: any = {
      insuranceQuote: {
        quoteDetails: {
          entry: [
            {
              key: 'policyHolderSameAsMainDriver',
              value: 'true',
            },
            { key: 'dateOfBirth', value: '1991-12-29' },
          ],
        },
      },
    };
    spyOn(cartService, 'getActive').and.returnValues(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(res => {
        result = res;
      })
      .unsubscribe();
    expect(result).toEqual(true);
    expect(routingService.go).not.toHaveBeenCalled();
  });
});
