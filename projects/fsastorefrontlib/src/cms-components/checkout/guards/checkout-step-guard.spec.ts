import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../core/checkout/services/checkout-config.service';
import { CheckoutStepGuard } from './checkout-step-guard';

class MockRoutingConfigService {
  getRouteConfig() {
    return null;
  }
}

const testProduct = 'testProduct';
const testCategory = 'testCategory';
const testCategory2 = 'testCategory2';
const categoryCodeParam = ':categoryCode';

class MockCheckoutConfigService {
  steps = [
    {
      id: 'generalInformationStep',
      routeName: 'generalInformation',
      restrictedCategories: [testCategory],
    },
    {
      id: 'categoryStep',
      routeName: 'category',
      restrictedCategories: [testCategory2],
    },
    {
      id: 'addOptionsStep',
      routeName: 'addOptions',
    },
  ];
  getCurrentStepIndex() {
    return 0;
  }
}

const mockedCart = {
  code: 'testCartCode',
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            code: testProduct,
            defaultCategory: {
              code: testCategory,
            },
          },
        },
      ],
    },
  ],
};

class MockCartService {
  getActive() {
    return of(mockedCart);
  }
}

describe('CheckoutStepGuard', () => {
  let guard: CheckoutStepGuard;
  let routingConfigService: RoutingConfigService;
  let checkoutConfigService: FSCheckoutConfigService;
  let cartService: FSCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    guard = TestBed.inject(CheckoutStepGuard);
    routingConfigService = TestBed.inject(RoutingConfigService);
    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);
    cartService = TestBed.inject(FSCartService);
  });

  it('should not return true in case there is not category in route', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: ['testRoute'],
    });
    let result;
    const mockActivatedRoute = {
      url: [
        {
          path: categoryCodeParam,
        },
      ],
    };
    guard
      .canActivate(mockActivatedRoute as CmsActivatedRouteSnapshot)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).not.toEqual(true);
  });

  it('should return true in case current category is not restricted categories', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: ['testRoute'],
    });
    spyOn(checkoutConfigService, 'getCurrentStepIndex').and.returnValues(1);
    let result;
    const mockActivatedRoute = {
      url: [
        {
          path: categoryCodeParam,
        },
      ],
    };
    guard
      .canActivate(mockActivatedRoute as CmsActivatedRouteSnapshot)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(true);
  });
});
