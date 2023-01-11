import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { Cart } from '@spartacus/cart/base/root';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { Observable, of } from 'rxjs';
import { FSCheckoutConfigService } from '../services';
import { BindingStateType } from './../../../occ/occ-models/occ.models';
import { BindQuoteGuard } from './bind-quote.guard';

const mockCart = {
  code: 'cartCode',
  insuranceQuote: {
    state: {
      code: BindingStateType.BIND,
    },
  },
};
class MockRoutingService {
  go() {}
}

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of({});
  }
}

class MockGlobalMessageService {
  add() {}
}

class MockCheckoutConfigService {
  steps = [
    {
      id: 'generalInformationStep',
      routeName: 'generalInformation',
    },
    {
      id: 'comparisonCheckoutStep',
      routeName: 'category',
    },
    {
      id: 'addOptionsStep',
      routeName: 'addOptions',
    },
  ];
  getCurrentStepIndex() {
    return 1;
  }
}

describe(`BindQuoteGuard`, () => {
  let guard: BindQuoteGuard;
  let cartService: ActiveCartService;
  let routing: RoutingService;
  let checkoutConfigService: FSCheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(BindQuoteGuard);
    cartService = TestBed.inject(ActiveCartService);
    routing = TestBed.inject(RoutingService);
    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);
    localStorage.setItem('bindingState', 'true');
    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when quote bind state is BIND`, () => {
    mockCart.insuranceQuote.state.code = BindingStateType.BIND;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(false))
      .unsubscribe();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when quote bind state is UNBIND`, () => {
    mockCart.insuranceQuote.state.code = BindingStateType.UNBIND;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when source step is comparisonCheckoutStep`, () => {
    spyOn(checkoutConfigService, 'getCurrentStepIndex').and.returnValue(2);
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
