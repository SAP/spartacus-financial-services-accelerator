import { Type, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CurrencyService,
  I18nTestingModule,
  OrderEntry,
  RoutingService,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import {
  FSProduct,
  ActiveCategoryStep,
} from './../../../../occ/occ-models/occ.models';
import { AddOptionsComponent } from './add-options.component';

const product: FSProduct = {
  defaultCategory: {
    code: 'insurances_auto',
  },
  configurable: false,
};

let mockEntries: OrderEntry[] = [
  {
    product: product,
  },
];

const mockCategoryAndStep: ActiveCategoryStep = {
  activeCategory: 'insurances_travel',
  step: 'category',
};

class MockCartService {
  getLoaded() {}

  removeEntry(item: any) {}

  addOptionalProduct(
    orderEntryCode: string,
    qty: number,
    entryNumber: string
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return of(mockEntries);
  }
}

class MockCurrencyService {
  getActive() {
    return of('EUR');
  }
}

class MockRoutingService {
  go() {}
}

class MockCheckoutConfigService {
  previousStep = of({ activeCategory: 'insurances_travel', step: 'category' });
  getNextCheckoutStepUrl(activeRoute: any) {
    return '/';
  }
}

describe('AddOptionsComponent', () => {
  let component: AddOptionsComponent;
  let fixture: ComponentFixture<AddOptionsComponent>;
  let cartService: FSCartService;
  let routingService: RoutingService;
  let checkoutConfigService: FSCheckoutConfigService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SpinnerModule,
        MediaModule,
        NgbTooltipModule,
      ],
      declarations: [AddOptionsComponent],
      providers: [
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
        {
          provide: CurrencyService,
          useClass: MockCurrencyService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'checkout/add-options',
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cartService = TestBed.get(FSCartService as Type<FSCartService>);
    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'addOptionalProduct').and.callThrough();
    spyOn(cartService, 'getEntries').and.callThrough();

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.callThrough();

    checkoutConfigService = TestBed.get(FSCheckoutConfigService as Type<
      FSCheckoutConfigService
    >);
    spyOn(checkoutConfigService, 'getNextCheckoutStepUrl').and.callThrough();

    component.ngOnInit();
    el = fixture.debugElement;
  });

  it('should create add options component', () => {
    expect(component).toBeTruthy();
  });

  it('should not remove product from cart', () => {
    component.removeProductFromCart(undefined);
    expect(cartService.removeEntry).not.toHaveBeenCalled();
  });

  it('should remove product from cart', () => {
    component.removeProductFromCart({});
    expect(cartService.removeEntry).toHaveBeenCalledWith({});
  });

  it('should not add product to cart', () => {
    component.addProductToCart(undefined, '1');
    expect(cartService.addOptionalProduct).not.toHaveBeenCalled();
  });

  it('should add product to cart', () => {
    component.addProductToCart('orderCode', '1');
    expect(cartService.addOptionalProduct).toHaveBeenCalledWith(
      'orderCode',
      1,
      '1'
    );
  });

  it('should go back', () => {
    mockEntries = [
      {
        product: product,
      },
    ];
    component.ngOnInit();
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate next', () => {
    mockEntries = [
      {
        product: product,
      },
    ];
    component.ngOnInit();
    component.navigateNext(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should set currentCurrency variable to EUR', () => {
    component.ngOnInit();
    expect(component.currentCurrency).toEqual('EUR');
  });
});
