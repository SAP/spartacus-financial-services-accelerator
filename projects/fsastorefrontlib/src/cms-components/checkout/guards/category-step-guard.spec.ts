import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { FSCheckoutConfigService } from './../../../core/checkout/services/checkout-config.service';
import { CategoryStepGuard } from './category-step-guard';

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
  let routingConfigService: MockRoutingConfigService;
  let checkoutConfigService: MockCheckoutConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
    }).compileComponents();

    guard = TestBed.get(CategoryStepGuard as Type<CategoryStepGuard>);
    routingConfigService = TestBed.get(
      RoutingConfigService as Type<RoutingConfigService>
    );
    checkoutConfigService = TestBed.get(
      FSCheckoutConfigService as Type<FSCheckoutConfigService>
    );
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
