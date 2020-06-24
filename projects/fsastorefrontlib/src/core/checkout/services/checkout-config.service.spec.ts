import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  RoutesConfig,
  RoutingConfigService,
  OrderEntry,
  Product,
} from '@spartacus/core';
import { CheckoutConfig, CurrentProductService } from '@spartacus/storefront';
import { FSCheckoutStep } from '../../../occ';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { checkoutConfig } from '../../../cms-components/checkout/config/default-checkout-config';
import { storefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { FSCheckoutConfigService } from './checkout-config.service';
import { Observable, of } from 'rxjs';

const mockCheckoutSteps: Array<FSCheckoutStep> = checkoutConfig.checkout.steps;

const mockCheckoutConfig: CheckoutConfig = checkoutConfig;

const product: FSProduct = {
  defaultCategory: {
    code: 'insurances_auto',
  },
  configurable: false,
};

const mockEntries: OrderEntry[] = [
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

const mockRoutingConfig: RoutesConfig = storefrontRoutesConfig;

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return mockCheckoutConfig[routeName].paths[0];
  }
}

const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('FSCheckoutConfigService', () => {
  let service: FSCheckoutConfigService;
  let activatedRoute: ActivatedRoute;
  let routingConfigService: RoutingConfigService;
  let cartService: FSCartService;
  let currentProductService: CurrentProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: mockCheckoutConfig, useClass: CheckoutConfig },
        {
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'checkout/add-options',
            },
          },
        },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    });
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    routingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    cartService = TestBed.get(FSCartService as Type<FSCartService>);
    spyOn(cartService, 'getActive').and.callThrough();
    currentProductService = TestBed.get(CurrentProductService as Type<
      CurrentProductService
    >);

    service = new FSCheckoutConfigService(
      mockCheckoutConfig,
      routingConfigService,
      cartService,
      currentProductService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return active step index', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: ['addOptions'],
    });
    spyOn<any>(service, 'getUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });
    expect(service.getCurrentStepIndex(activatedRoute)).toBe(3);
  });

  it('should not remove product from cart', () => {
    service.setBackNextSteps(activatedRoute);
    expect(cartService.getActive).toHaveBeenCalled();
  });

  it('should return current step index if step exists', () => {
    const activeStepIndex = 5;
    spyOn<any>(service, 'getUrlFromActivatedRoute').and.returnValue(
      '/' +
        mockRoutingConfig[mockCheckoutSteps[activeStepIndex].routeName].paths[0]
    );
    spyOn<any>(service, 'getUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });
    expect(service.getCurrentStepIndex(activatedRoute)).toBe(activeStepIndex);
  });

  it('should not return current step index for non existing step', () => {
    spyOn<any>(service, 'getUrlFromActivatedRoute').and.returnValue(
      '/notExistingStep'
    );
    spyOn<any>(service, 'getUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });
    expect(service.getCurrentStepIndex(activatedRoute)).toBe(null);
  });
});
