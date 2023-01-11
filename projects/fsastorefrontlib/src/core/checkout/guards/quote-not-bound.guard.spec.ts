import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { Cart } from '@spartacus/cart/base/root';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { Observable, of } from 'rxjs';
import { BindingStateType } from './../../../occ/occ-models/occ.models';
import { QuoteNotBoundGuard } from './quote-not-bound.guard';

const mockCart = {
  code: 'cartCode',
  insuranceQuote: {
    state: {
      code: BindingStateType.UNBIND,
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

describe(`QuoteNotBoundGuard`, () => {
  let guard: QuoteNotBoundGuard;
  let cartService: ActiveCartService;
  let routing: RoutingService;

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
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(QuoteNotBoundGuard);
    cartService = TestBed.inject(ActiveCartService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when quote is not bound`, () => {
    mockCart.insuranceQuote.state.code = BindingStateType.UNBIND;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(false))
      .unsubscribe();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when quote binding state is BIND`, () => {
    mockCart.insuranceQuote.state.code = BindingStateType.BIND;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
