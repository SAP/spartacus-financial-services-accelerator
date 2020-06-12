import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RoutesConfig, RoutingConfigService } from '@spartacus/core';
import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutStep } from '../../../cms-components/checkout/components/checkout-progress/checkout-step.component';
import { checkoutConfig } from '../../../cms-components/checkout/config/default-checkout-config';
import { storefrontRoutesConfig } from '../../../cms-structure/routing/default-routing-config';
import { FSCheckoutConfigService } from './checkout-config.service';

const mockCheckoutSteps: Array<FSCheckoutStep> = checkoutConfig.checkout.steps;

const mockCheckoutConfig: CheckoutConfig = checkoutConfig;

const mockRoutingConfig: RoutesConfig = storefrontRoutesConfig;

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return mockCheckoutConfig[routeName].paths[0];
  }
}

describe('FSCheckoutConfigService', () => {
  let service: FSCheckoutConfigService;
  let activatedRoute: ActivatedRoute;
  let routingConfigService: RoutingConfigService;

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
      ],
    });
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    routingConfigService = TestBed.get(
      RoutingConfigService as Type<RoutingConfigService>
    );

    service = new FSCheckoutConfigService(
      mockCheckoutConfig,
      routingConfigService,
      activatedRoute
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return active step index', () => {
  //   spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
  //     paths: ['addOptions'],
  //   });
  //   spyOn<any>(service, 'getUrlFromStepRoute').and.callFake(route => {
  //     return mockRoutingConfig[route].paths[0];
  //   });
  //   expect(service.getCurrentStepIndex(activatedRoute)).toBe(3);
  // });

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
