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
import { CategoryStepGuard } from './category-step-guard';
import { FSCheckoutConfigService } from './../../../core/checkout/services/fs-checkout-config.service';

class RoutingServiceStub {
  go(_path: any[] | UrlCommands, _query?: object, _extras?: NavigationExtras) {}
}

class MockRoutingConfigService {
  getRouteConfig() {
    return null;
  }
}

const testCategory = 'testCategory';
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

describe('CategoryStepGuard', () => {
  let guard: CategoryStepGuard;
  let routing: RoutingService;
  let routingConfigService: MockRoutingConfigService;
  let checkoutConfigService: MockCheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    guard = TestBed.get(CategoryStepGuard as Type<CategoryStepGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
    routingConfigService = TestBed.get(RoutingConfigService as Type<
      RoutingConfigService
    >);
    checkoutConfigService = TestBed.get(FSCheckoutConfigService as Type<
      FSCheckoutConfigService
    >);
  });

  it('should not return true in case there is not category in route', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: ['testRoute'],
    });
    let result;
    const mockActivatedRoute = {
      url: [
        {
          path: testCategory,
        },
      ],
    };
    guard
      .canActivate(mockActivatedRoute as CmsActivatedRouteSnapshot)
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).not.toEqual(true);
  });

  it('should return true in case category is restricted', () => {
    spyOn(routingConfigService, 'getRouteConfig').and.returnValues({
      paths: [testCategory],
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
    expect(result).toEqual(true);
  });

  it('should return true in case there are no restricted categories', () => {
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
