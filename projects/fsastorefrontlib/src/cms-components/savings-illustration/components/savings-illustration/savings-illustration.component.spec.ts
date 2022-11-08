import { Component, Input, QueryList } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import {
  I18nTestingModule,
  Product,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { SavingsIllustrationComponent } from '@spartacus/fsa-storefront';
import {
  BREAKPOINT,
  BreakpointService,
  SpinnerModule,
} from '@spartacus/storefront';
import { EChartsOption } from 'echarts';
import { Observable, of } from 'rxjs';
import { FSCartService, FSProductService } from '../../../../core';
import { PricingService } from '../../../../core/product-pricing/facade/pricing.service';
import { SavingsIllustrationChartService } from '../../../../core/savings-illustration/facade/savings-illustration-chart.service';
import { FSProduct, PricingData } from '../../../../occ';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';

let mockParams = {
  savingsProductCode: 'savingsProductCode',
};
const pricingData: PricingData = {
  priceAttributeGroups: [
    {
      name: 'test',
      priceAttributes: [
        {
          key: 'savingsDetails',
          value: 'Pension',
        },
        {
          key: 'savingsStartDate',
          value: '2022-02-02',
        },
      ],
    },
  ],
};
class MockWindowRef {
  nativeWindow = {
    innerWidth: 1000,
  };
  get resize$(): Observable<any> {
    return of({
      target: {
        innerWidth: 0,
      },
    });
  }
}
const mockEchartOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    top: 'bottom',
  },
  xAxis: [
    {
      type: 'category',
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
};
const formDataId = 'testFormDataId';
const formData = {
  id: formDataId,
  type: 'DATA',
  content:
    '{"testContent":{"savingsDetails":"Pension","savingsStartDate":"2022-02-02"}}',
  formDefinition: {
    formId: 'formDefinitionId',
  },
};

const mockedProduct: FSProduct = {
  code: 'productCode',
  defaultCategory: {
    code: 'testCategoryCode',
  },
  price: {
    oneTimeChargeEntries: [
      {
        billingTime: {
          code: 'paynow',
        },
        price: {
          value: 25.0,
        },
      },
    ],
  },
};

@Component({
  // eslint-disable-next-line
  selector: 'cx-pagination',
  template: '',
})
class MockPaginationComponent {
  @Input() pagination;
}
class MockProductService {
  get(): Observable<Product> {
    return of(mockedProduct);
  }
  getCalculatedProductData(): Observable<Product> {
    return of(mockedProduct);
  }
}
class ActivatedRouteMock {
  params = of(mockParams);
}
class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return of(formDataId);
  }
}
class MockFormDataService {
  loadFormData() {}
  getFormData() {
    return of(formData);
  }
}
class MockPricingService {
  buildPricingData() {}
}
class MockSavingsIllustrationChartService {
  getSavingsIllustrationChartOptions() {
    return of(mockEchartOption);
  }
}
class MockCartService {
  createCartForProduct() {}
}
class MockBreakpointService {
  breakpoint$ = of(BREAKPOINT.xs);
}
class MockRoutingService {
  go() {}
}
const mockEchart: any = {
  id: 'mockEchartId',
};

describe('SavingsIllustrationComponent', () => {
  let component: SavingsIllustrationComponent;
  let fixture: ComponentFixture<SavingsIllustrationComponent>;
  let activatedRoute: ActivatedRoute;
  let productService: FSProductService;
  let formDataStorageService: FormDataStorageService;
  let formDataService: FormDataService;
  let pricingService: PricingService;
  let chartService: SavingsIllustrationChartService;
  let cartService: FSCartService;
  let breakpointService: BreakpointService;
  let routingService: RoutingService;
  let windowRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          RouterTestingModule,
          SpinnerModule,
          AccordionModule,
        ],
        declarations: [SavingsIllustrationComponent, MockPaginationComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useClass: ActivatedRouteMock,
          },
          {
            provide: FSProductService,
            useClass: MockProductService,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
          {
            provide: FormDataService,
            useValue: MockFormDataService,
          },
          {
            provide: PricingService,
            useClass: MockPricingService,
          },
          {
            provide: SavingsIllustrationChartService,
            useClass: MockSavingsIllustrationChartService,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          { provide: WindowRef, useClass: MockWindowRef },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    productService = TestBed.inject(FSProductService);
    formDataStorageService = TestBed.inject(FormDataStorageService);
    formDataService = TestBed.inject(FormDataService);
    pricingService = TestBed.inject(PricingService);
    chartService = TestBed.inject(SavingsIllustrationChartService);
    cartService = TestBed.inject(FSCartService);
    breakpointService = TestBed.inject(BreakpointService);
    routingService = TestBed.inject(RoutingService);
    component.tabNavigation = {} as QueryList<NgbNav>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create cart and start bundle for product', () => {
    spyOn(cartService, 'createCartForProduct').and.callThrough();
    component.pricingData$ = of(pricingData);
    component.createCartAndStartBundleForProduct(
      'productCode',
      'testBundleTemplateId'
    );
    expect(cartService.createCartForProduct).toHaveBeenCalled();
  });
});
