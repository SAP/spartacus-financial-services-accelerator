import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { Cart } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { BindingStateType, FSCart } from './../../../occ/occ-models/occ.models';
import { PersonalDetailsSetGuard } from './personal-details-set.guard';

const mockFormData = [
  {
    id: 'form_data_id',
    content:
      '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
  },
];

const mockCart: FSCart = {
  code: 'cartCode',
  entries: [
    {
      entryNumber: 0,
      product: {
        code: 'test_product',
      },
      formData: mockFormData,
    },
  ],
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
  isStable(): Observable<boolean> {
    return of(true);
  }
}

describe(`PersonalDetailsSetGuard`, () => {
  let guard: PersonalDetailsSetGuard;
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
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(PersonalDetailsSetGuard);
    cartService = TestBed.inject(ActiveCartService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the personal details checkout step when corresponding form data is missing `, () => {
    mockCart.entries[0].formData = undefined;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(false))
      .unsubscribe();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the personal details checkout step when correspindig form data exists`, () => {
    mockCart.entries[0].formData = mockFormData;
    spyOn(cartService, 'getActive').and.returnValue(of(mockCart));
    guard
      .canActivate()
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
