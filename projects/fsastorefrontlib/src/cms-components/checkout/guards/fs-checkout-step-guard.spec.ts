import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  UrlCommands,
  RoutingService,
  RoutingConfigService,
  CmsActivatedRouteSnapshot,
} from '@spartacus/core';
import { FSCheckoutConfigService } from './../../../core/checkout/services/fs-checkout-config.service';
import { FSCheckoutStepGuard } from './fs-checkout-step-guard';
import { FSCartService } from './../../../core/cart/facade/fs-cart.service';
import { of } from 'rxjs';

class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}

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

describe('FSCheckoutStepGuard', () => {
  let guard: FSCheckoutStepGuard;
  let routing: RoutingService;
  let routingConfigService: MockRoutingConfigService;
  let checkoutConfigService: MockCheckoutConfigService;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
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

    guard = TestBed.get(FSCheckoutStepGuard as Type<FSCheckoutStepGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
    routingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    checkoutConfigService = TestBed.get(FSCheckoutConfigService as Type<
      FSCheckoutConfigService
    >);
    cartService = TestBed.get(FSCartService as Type<FSCartService>);
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

  it('should return true in case there is not product in cart and unsubscribe', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: ['testRoute'],
    });
    spyOn(checkoutConfigService, 'getCurrentStepIndex').and.returnValues(0);
    const emptyCart = {
      deliveryOrderGroups: [],
    };
    spyOn(cartService, 'getActive').and.returnValues(of(emptyCart));

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

    const subscriptions = guard['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    guard.ngOnDestroy();

    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
