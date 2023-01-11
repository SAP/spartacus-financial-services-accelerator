import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { Cart } from '@spartacus/cart/base/root';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { Observable, of } from 'rxjs';
import { QuoteWorkflowStatusType } from './../../../occ/occ-models/occ.models';
import { ReferredQuoteGuard } from './referred-quote.guard';

const mockCart = {
  code: 'cartCode',
  insuranceQuote: {
    state: {
      code: 'BIND',
    },
    quoteWorkflowStatus: {
      code: 'REFERRED',
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

describe(`ReferredQuoteGuard`, () => {
  let guard: ReferredQuoteGuard;
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

    guard = TestBed.inject(ReferredQuoteGuard);
    cartService = TestBed.inject(ActiveCartService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when quote workflow status is REFERRED`, () => {
    mockCart.insuranceQuote.quoteWorkflowStatus.code =
      QuoteWorkflowStatusType.REFERRED;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBeFalsy();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when quote workflow status is not REFERRED`, () => {
    mockCart.insuranceQuote.quoteWorkflowStatus.code =
      QuoteWorkflowStatusType.PENDING;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBeTruthy();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
