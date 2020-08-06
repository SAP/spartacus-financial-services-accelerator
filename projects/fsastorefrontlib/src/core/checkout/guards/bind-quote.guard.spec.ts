import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  GlobalMessageService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

describe(`BindQuoteGuard`, () => {
  let guard: BindQuoteGuard;
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

    guard = TestBed.inject(BindQuoteGuard);
    cartService = TestBed.inject(ActiveCartService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when quote workflow status is BIND`, () => {
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(false);
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when quote workflow status is UNBIND`, () => {
    mockCart.insuranceQuote.state.code = BindingStateType.UNBIND;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(true);
    expect(routing.go).not.toHaveBeenCalled();
  });
});
