import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  I18nTestingModule,
  OrderEntry,
  RoutingService,
  CurrencyService,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { CategoryService } from './../../../../core/checkout/services/category/category.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSProduct } from './../../../../occ/occ-models/occ.models';
import { AddOptionsComponent } from './add-options.component';

const product: FSProduct = {
  defaultCategory: {
    code: 'insurances_auto',
  },
};

let mockEntries: OrderEntry[] = [
  {
    product: product,
  },
];

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
  getNextCheckoutStepUrl(activeRoute: any) {
    return '/';
  }
}

class MockCategoryService {
  getActiveCategory(): Observable<string> {
    return of('insurances_auto');
  }
}

describe('AddOptionsComponent', () => {
  let component: AddOptionsComponent;
  let fixture: ComponentFixture<AddOptionsComponent>;
  let cartService: FSCartService;
  let routingService: RoutingService;
  let checkoutConfigService: FSCheckoutConfigService;
  let categoryService: CategoryService;
  let currencyService: CurrencyService;

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
          provide: CategoryService,
          useClass: MockCategoryService,
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
    spyOn(cartService, 'getLoaded').and.callThrough();
    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'addOptionalProduct').and.callThrough();
    spyOn(cartService, 'getEntries').and.callThrough();

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.callThrough();

    checkoutConfigService = TestBed.get(FSCheckoutConfigService as Type<
      FSCheckoutConfigService
    >);
    spyOn(checkoutConfigService, 'getNextCheckoutStepUrl').and.callThrough();

    categoryService = TestBed.get(CategoryService as Type<CategoryService>);
    spyOn(categoryService, 'getActiveCategory').and.callThrough();

    component.ngOnInit();
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
    component.back();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate next', () => {
    mockEntries = [
      {
        product: product,
      },
    ];
    component.ngOnInit();
    component.navigateNext();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not navigate next because product is empty', () => {
    mockEntries = [{}];
    component.ngOnInit();
    component.navigateNext();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not navigate next because default category is empty', () => {
    mockEntries = [
      {
        product: {},
      },
    ];
    component.ngOnInit();
    component.navigateNext();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should set currentCurrency variable to EUR', () => {
    component.ngOnInit();
    expect(component.currentCurrency).toEqual('EUR');
  });
});
