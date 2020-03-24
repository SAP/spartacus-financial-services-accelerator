import { fsaStorefrontRoutesConfig } from './../../../../cms-structure/routing/default-fsa-routing-config';
import { RouterTestingModule } from '@angular/router/testing';
import { FSCartService } from './../../../../core/cart/facade/fs-cart.service';
import { CategoryService } from './../../../../core/checkout/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import {
  RoutingService,
  RoutingConfigService,
  I18nTestingModule,
  RoutesConfig,
} from '@spartacus/core';
import { CheckoutConfig } from '@spartacus/storefront';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FSCheckoutProgressComponent } from './fs-checkout-progress.component';
import { fsaCheckoutConfig } from '../../config/default-fsa-checkout-config';
import { Pipe, PipeTransform, Type } from '@angular/core';
import { of, Observable } from 'rxjs';

const mockCheckoutConfig: CheckoutConfig = fsaCheckoutConfig;

const MockRoutesConfig: RoutesConfig = fsaStorefrontRoutesConfig;

let mockParams = {};

let mockCart = {
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
  routeConfig = {
    path: 'checkout/add-options',
  };
  params = of(mockParams);
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
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

describe('FSCheckoutProgressComponent', () => {
  let component: FSCheckoutProgressComponent;
  let fixture: ComponentFixture<FSCheckoutProgressComponent>;

  let routingService: RoutingService;
  let routingConfigService: RoutingConfigService;
  let categoryService: CategoryService;
  let cartService: FSCartService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSCheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.callThrough();
    spyOn(routingService, 'getRouterState').and.callThrough();

    categoryService = TestBed.get(CategoryService as Type<CategoryService>);
    spyOn(categoryService, 'setActiveCategory').and.callThrough();
    spyOn(categoryService, 'getActiveCategory').and.callThrough();

    routingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    spyOn(routingConfigService, 'getRouteConfig').and.callThrough();

    cartService = TestBed.get(FSCartService as Type<FSCartService>);
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
      deliveryOrderGroups: null,
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 1', () => {
    mockCart = {
      deliveryOrderGroups: [],
    };
    component.ngOnInit();
  });

  it('should not set active category to default category code 2', () => {
    mockCart = {
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

  it('should not set active categorys to default category code 5', () => {
    mockCart = {
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
});
