import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  OccConfig,
  I18nTestingModule,
  Product,
  RoutingService,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../core/checkout/services/checkout-config.service';
import { FSProductService } from './../../../core/product-pricing/facade/product.service';
import { ComparisonTableService } from '../comparison-table.service';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { ComparisonTablePanelItemComponent } from './comparison-table-panel-item.component';
import createSpy = jasmine.createSpy;

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const paynow = 'paynow';

const billingTimes = [
  {
    code: paynow,
    name: 'Paynow',
    helpContent: 'Test help content',
    orderNumber: 1,
  },
  {
    code: 'hospitalbenefit',
    name: 'Hospital Benefit',
    helpContent: 'Test help content',
    orderNumber: 2,
  },
];

const productCode = 'TEST_PRODUCT';
const productName = 'Test Prduct';
const currencyIso = 'EUR';
const productPrice = '€25.00';
const recurringPrice = '€10.00';

const product: FSProduct = {
  code: productCode,
  name: productName,
  price: {
    currencyIso: currencyIso,
    oneTimeChargeEntries: [
      {
        billingTime: {
          code: paynow,
        },
        price: {
          value: 25.0,
          formattedValue: productPrice,
        },
      },
    ],
  },
};

const recurringProduct: FSProduct = {
  code: productCode,
  name: productName,
  price: {
    recurringChargeEntries: [
      {
        price: {
          currencyIso: currencyIso,
          formattedValue: recurringPrice,
        },
      },
    ],
  },
};

class MockComparisonTableService {
  setAvailableTabs() {}
  calculateHeights() {}
  setHeightsAtResize() {
    return of();
  }
}

class MockCartService {
  createCartForProduct(): void {}
}

const testBaseUrl = '';
const mockCmsConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: testBaseUrl,
      prefix: '/rest/v2/',
    },
  },

  context: {
    baseSite: ['test-site'],
  },
};

class MockRoutingService {
  go = createSpy();
}

const nextStep = 'nextStep';

class MockFSCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return nextStep;
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'test'],
  },
};

class MockFSProductService {
  getCalculatedProductData(): Observable<Product> {
    return of();
  }

  isLoading(): Observable<boolean> {
    return of(true);
  }
}

describe('ComparisonTablePanelItemComponent', () => {
  let comparisonTablePanelItemComponent: ComparisonTablePanelItemComponent;
  let fixture: ComponentFixture<ComparisonTablePanelItemComponent>;
  let mockCartService: FSCartService;
  let mockProductService: FSProductService;
  let comparisonTableService: ComparisonTableService;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          SpinnerModule,
          MediaModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: OccConfig,
            useValue: mockCmsConfig,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FSCheckoutConfigService,
            useClass: MockFSCheckoutConfigService,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
          {
            provide: FSProductService,
            useClass: MockFSProductService,
          },
          {
            provide: ComparisonTableService,
            useClass: MockComparisonTableService,
          },
        ],
        declarations: [ComparisonTablePanelItemComponent, MockUrlPipe],
      }).compileComponents();
      mockCartService = TestBed.inject(FSCartService);
      mockProductService = TestBed.inject(FSProductService);
      comparisonTableService = TestBed.inject(ComparisonTableService);
      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTablePanelItemComponent);
    comparisonTablePanelItemComponent = fixture.componentInstance;
    comparisonTablePanelItemComponent.billingTimes = billingTimes;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comparisonTablePanelItemComponent).toBeTruthy();
  });

  it('should create comparison panel item with with one time chaarge entry', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(product)
    );
    comparisonTablePanelItemComponent.ngOnInit();
    comparisonTablePanelItemComponent.product$
      .subscribe(productData => {
        expect(productData).toEqual(product);
      })
      .unsubscribe();
  });

  it('should create comparison panel item with recurring entry', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(recurringProduct)
    );
    comparisonTablePanelItemComponent.ngOnInit();
    let result;
    comparisonTablePanelItemComponent.product$
      .subscribe(_ => {
        result = comparisonTablePanelItemComponent.productPrice;
      })
      .unsubscribe();
    expect(result).toEqual(recurringPrice);
  });

  it('should not define price when product of comparison table panel item is not initialized', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of({})
    );
    comparisonTablePanelItemComponent.ngOnInit();
    expect(comparisonTablePanelItemComponent.productPrice).not.toBeTruthy();
  });

  it('should not define price when billing times are invalid', () => {
    const invalidProduct: FSProduct = {
      code: productCode,
      name: productName,
      price: {
        currencyIso: currencyIso,
        oneTimeChargeEntries: [
          {
            billingTime: {
              code: 'invalid_billing_time_code',
            },
            price: {
              formattedValue: '€0.00',
            },
          },
        ],
      },
    };
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(invalidProduct)
    );
    let result;
    comparisonTablePanelItemComponent.ngOnInit();
    comparisonTablePanelItemComponent.product$
      .subscribe(_ => {
        result = comparisonTablePanelItemComponent.productPrice;
      })
      .unsubscribe();
    expect(result).not.toBeTruthy();
  });

  it('should create and start bundle', () => {
    spyOn(mockCartService, 'createCartForProduct').and.stub();
    comparisonTablePanelItemComponent.createCartAndStartBundleForProduct(
      'TEST_PRODUCT',
      'bundleTemplateId'
    );

    expect(mockCartService.createCartForProduct).toHaveBeenCalled();
  });

  it('should navigate to addOptions step when product is not configurable', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(product)
    );
    spyOn(mockCartService, 'createCartForProduct').and.stub();
    comparisonTablePanelItemComponent.getProductData();
    comparisonTablePanelItemComponent.createCartAndStartBundleForProduct(
      'TEST_PRODUCT',
      'bundleTemplateId'
    );

    expect(mockCartService.createCartForProduct).toHaveBeenCalled();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'addOptions',
      params: Object({ code: undefined }),
    });
  });

  it('should navigate to configureProduct step when product is configurable', () => {
    const mockProduct: FSProduct = {
      code: productCode,
      name: productName,
      configurable: true,
    };
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(mockProduct)
    );
    spyOn(mockCartService, 'createCartForProduct').and.stub();
    comparisonTablePanelItemComponent.getProductData();
    comparisonTablePanelItemComponent.createCartAndStartBundleForProduct(
      'TEST_PRODUCT',
      'bundleTemplateId'
    );

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'configureProduct',
      params: Object({ code: 'TEST_PRODUCT' }),
    });
  });

  it('should set product price when product has dynamic attributes', () => {
    const mockProductPrice = '25.00';
    const mockProduct = {
      code: productCode,
      name: productName,
      price: {
        currencyIso: currencyIso,
        oneTimeChargeEntries: [
          {
            billingTime: {
              code: paynow,
            },
            price: {
              value: 25.0,
              formattedValue: mockProductPrice,
            },
          },
        ],
      },
      dynamicAttributes: [
        {
          key: 'monthlyAnnuity',
          value: {
            formattedValue: mockProductPrice,
          },
        },
      ],
    };
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(mockProduct)
    );
    spyOn(mockCartService, 'createCartForProduct').and.stub();
    comparisonTablePanelItemComponent.getProductData();
    expect(comparisonTablePanelItemComponent.productPrice).toEqual(
      mockProductPrice
    );
  });

  it('should get base url', () => {
    const baseUrl = comparisonTablePanelItemComponent.baseUrl;
    expect(baseUrl).toEqual(testBaseUrl);
  });
});
