import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { FSCheckoutService } from '../facade';
import { LegalInformationSetGuard } from './legal-information-set.guard';

class MockRoutingService {
  go() {}
}

class MockCheckoutService {
  getLegalInformation() {
    return of(true);
  }
}

describe(`LegalInformationSetGuard`, () => {
  let guard: LegalInformationSetGuard;
  let checkoutService: MockCheckoutService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FSCheckoutService,
          useClass: MockCheckoutService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(LegalInformationSetGuard);
    checkoutService = TestBed.inject(FSCheckoutService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the user identification step when legal information is given `, () => {
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });
  it(`should not redirect to the user identification step when legal information is not given`, () => {
    spyOn(checkoutService, 'getLegalInformation').and.returnValue(of(false));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(false))
      .unsubscribe();
    expect(routing.go).toHaveBeenCalled();
  });
});
