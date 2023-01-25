import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  Product,
  RoutesConfig,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { Observable, of } from 'rxjs';
import { storefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { checkoutConfig } from '../../config/default-checkout-config';
import {
  BindingStateType,
  FSProduct,
} from './../../../../occ/occ-models/occ.models';
import { FSCheckoutProgressComponent } from './checkout-progress.component';

const mockCheckoutConfig: CheckoutConfig = checkoutConfig;

const mockRoutesConfig: RoutesConfig = storefrontRoutesConfig;

let mockParams = {};

let mockCart = {
  code: 'cart',
  insuranceQuote: {},
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            defaultCategory: {
              code: 'testCode',
            },
          },
        },
      ],
    },
  ],
};

const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {
  go() {}

  getRouterState(): Observable<any> {
    return of({
      state: {
        context: {
          id: 'testId',
        },
      },
    });
  }
}

class MockActivatedRoute {
  snapshot = {
    data: {
      cxRoute: 'addOptions',
    },
  };
  params = of(mockParams);
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCategoryService {
  setActiveCategory(category: string) {}

  getActiveCategory(): Observable<string> {
    return of('testCategory');
  }
}

class MockCartService {
  getActive() {
    return of(mockCart);
  }
}

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('FSCheckoutProgressComponent', () => {
  let component: FSCheckoutProgressComponent;
  let fixture: ComponentFixture<FSCheckoutProgressComponent>;

  let routingService: RoutingService;
  let routingConfigService: RoutingConfigService;
  let categoryService: CategoryService;
  let cartService: FSCartService;
  let currentProductService: CurrentProductService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [FSCheckoutProgressComponent, MockUrlPipe],
        providers: [
          {
            provide: CheckoutConfig,
            useValue: mockCheckoutConfig,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: RoutingConfigService,
            useClass: MockRoutingConfigService,
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: CategoryService,
            useClass: MockCategoryService,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSCheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    spyOn(routingService, 'getRouterState').and.callThrough();

    categoryService = TestBed.inject(CategoryService);
    spyOn(categoryService, 'setActiveCategory').and.callThrough();
    spyOn(categoryService, 'getActiveCategory').and.callThrough();

    routingConfigService = TestBed.inject(RoutingConfigService);
    spyOn(routingConfigService, 'getRouteConfig').and.callThrough();

    cartService = TestBed.inject(FSCartService);
    currentProductService = TestBed.inject(CurrentProductService);

    spyOn(cartService, 'getActive').and.callThrough();
  });

  it('should create component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set category from form code param', () => {
    mockParams = {
      formCode: 'testCode',
    };
    component.ngOnInit();
  });

  it('should set category from category code param', () => {
    mockParams = {
      categoryCode: 'testCategory',
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: null,
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 1', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: [],
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 2', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: [
        {
          entries: null,
        },
      ],
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 3', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: [
        {
          entries: [],
        },
      ],
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 4', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: [
        {
          entries: [
            {
              product: null,
            },
          ],
        },
      ],
    };
    component.ngOnInit();
  });

  it('should not set active categories to default category code 5', () => {
    mockCart = {
      code: 'cart',
      insuranceQuote: {},
      deliveryOrderGroups: [
        {
          entries: [
            {
              product: {
                defaultCategory: null,
              },
            },
          ],
        },
      ],
    };
    component.ngOnInit();
  });

  it('should set category from product code param', () => {
    mockParams = {
      productCode: 'testProduct',
    };
    component.ngOnInit();
    component.activeCategory$
      .subscribe(activeCategory => {
        expect(activeCategory).toBe(mockProduct.defaultCategory.code);
      })
      .unsubscribe();
  });

  it('should return true when quote is bound', () => {
    mockCart = {
      code: 'cartCode',
      deliveryOrderGroups: [],
      insuranceQuote: {
        state: {
          code: BindingStateType.BIND,
        },
      },
    };
    component.ngOnInit();
    let bound;
    component.isQuoteBound().subscribe(result => (bound = result));
    expect(bound).toEqual(true);
  });

  it('should return false when quote is not bound', () => {
    mockCart = {
      code: 'cartCode',
      deliveryOrderGroups: [],
      insuranceQuote: {
        state: {
          code: BindingStateType.UNBIND,
        },
      },
    };
    component.ngOnInit();
    let bound;
    component.isQuoteBound().subscribe(result => (bound = result));
    expect(bound).toEqual(false);
  });
  it('should return false when quote does not have state code', () => {
    mockCart = {
      code: 'cartCode',
      deliveryOrderGroups: [],
      insuranceQuote: {},
    };
    component.ngOnInit();
    let bound;
    component.isQuoteBound().subscribe(result => (bound = result));
    expect(bound).toEqual(false);
  });
});
