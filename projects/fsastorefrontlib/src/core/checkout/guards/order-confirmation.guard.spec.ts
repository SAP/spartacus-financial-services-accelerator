import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { FSCheckoutService } from '../facade';
import { OrderConfirmationGuard } from './order-confirmation.guard';

class MockRoutingService {
  go() {}
}

class MockCheckoutService {
  orderPlaced: boolean;
}

describe(`OrderConfirmationGuard`, () => {
  let guard: OrderConfirmationGuard;
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

    guard = TestBed.inject(OrderConfirmationGuard);
    checkoutService = TestBed.inject(FSCheckoutService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to homepage when order is not placed `, () => {
    checkoutService.orderPlaced = false;
    guard.canActivate();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage in case order is placed`, () => {
    checkoutService.orderPlaced = true;
    guard.canActivate();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
