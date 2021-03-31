import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Product, RoutesConfig, RoutingConfigService } from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutStepService,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { checkoutConfig } from '../../../cms-components/checkout/config/default-checkout-config';
import { storefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { FSCheckoutStep } from '../../../occ';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from './checkout-config.service';

const mockCheckoutSteps: Array<FSCheckoutStep> = checkoutConfig.checkout.steps;

const mockCheckoutConfig: CheckoutConfig = checkoutConfig;

const mockCart = {
  entries: [
    {
      product: {
        defaultCategory: {
          code: 'insurances_auto',
        },
      },
    },
  ],
};
class MockCartService {
  getActive() {
    return of(mockCart);
  }
}

class MockCheckoutStepService {
  getPreviousCheckoutStepUrl() {
    return 'checkout/add-options';
  }
}

const mockRoutingConfig: RoutesConfig = storefrontRoutesConfig;

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return mockCheckoutConfig[routeName];
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
  let checkoutStepService: CheckoutStepService;
  let cartService: FSCartService;

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
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    });

    activatedRoute = TestBed.inject(ActivatedRoute);
    routingConfigService = TestBed.inject(RoutingConfigService);
    checkoutStepService = TestBed.inject(CheckoutStepService);
    cartService = TestBed.inject(FSCartService);

    service = new FSCheckoutConfigService(
      mockCheckoutConfig,
      routingConfigService,
      checkoutStepService,
      cartService
    );
    spyOn(checkoutStepService, 'getPreviousCheckoutStepUrl').and.returnValue(
      'checkout/c/insurances_auto'
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

  it('should return true for product step', () => {
    spyOn<any>(service, 'getUrlFromStepRoute').and.returnValue('/:productCode');
    expect(service.isProductStep('productPage')).toBe(true);
  });

  it('should return false for non product step', () => {
    spyOn<any>(service, 'getUrlFromStepRoute').and.returnValue('/route/:code');
    expect(service.isProductStep('nonProductPage')).toBe(false);
  });

  it('should trigger previous and next step', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
      paths: ['checkout/configureProduct/:productCode'],
    });
    spyOn<any>(service, 'getUrlFromStepRoute').and.callFake(route => {
      return mockRoutingConfig[route].paths[0];
    });
    service.triggerPreviousNextStepSet(activatedRoute);
    expect(service.getCurrentStepIndex(activatedRoute)).toBe(3);
  });
});
