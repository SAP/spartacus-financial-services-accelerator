import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@fsa/dynamicforms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { PricingData } from './../../../../../occ/occ-models/form-pricing.interface';
import { ProductConfigurationNavigationComponent } from './product-configuration-navigation.component';
import { FSProduct, FSSteps } from './../../../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../.././../../core/checkout/services/checkout-config.service';

const formDataId = 'formDataId';
const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

const pricingData: PricingData = {
  priceAttributeGroups: [
    {
      name: 'test',
      priceAttributes: [
        {
          key: 'tripDestination',
          value: 'Europe',
        },
        {
          key: 'tripStartDate',
          value: '2022-02-02',
        },
      ],
    },
  ],
};
const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
    name: 'Test Category',
  },
  bundleTemplates: [
    {
      id: 'testBundleTemplate',
    },
  ],
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

export class MockFormDataService {
  getSubmittedForm() {
    return of();
  }
  submit() {}
}

class MockPricingService {
  buildPricingData(): PricingData {
    return pricingData;
  }
}

class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return formDataId;
  }
}

class MockCartService {
  createCartForProduct(): void {}
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(activeRoute: any) {
    return '/';
  }
}
class MockRoutingService {
  go() {}
}

describe('ProductConfigurationNavigationComponent', () => {
  let component: ProductConfigurationNavigationComponent;
  let fixture: ComponentFixture<ProductConfigurationNavigationComponent>;
  let el: DebugElement;
  let formDataStorageService: FormDataStorageService;
  let formDataService: FormDataService;
  let pricingService: PricingService;
  let currentProductService: CurrentProductService;
  let cartService: FSCartService;
  let routingService: RoutingService;
  let checkoutConfigService: FSCheckoutConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductConfigurationNavigationComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
        {
          provide: PricingService,
          useClass: MockPricingService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
      ],
    }).compileComponents();
    currentProductService = TestBed.inject(CurrentProductService);
    formDataService = TestBed.inject(FormDataService);
    formDataStorageService = TestBed.inject(FormDataStorageService);
    pricingService = TestBed.inject(PricingService);
    cartService = TestBed.inject(FSCartService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigurationNavigationComponent);
    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);
    spyOn(checkoutConfigService, 'getNextCheckoutStepUrl').and.callThrough();
    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare data for cart creation', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    component.ngOnInit();
    expect(component.productCode).toEqual(mockProduct.code);
    expect(component.categoryCode).toEqual(mockProduct.defaultCategory.code);
    expect(component.bundleCode).toEqual(mockProduct.bundleTemplates[0].id);
  });

  it('should not prepare data for cart creation', () => {
    const product: FSProduct = {
      code: 'testProduct',
      defaultCategory: {
        code: 'testCategory',
        name: 'Test Category',
      },
    };
    spyOn(currentProductService, 'getProduct').and.returnValue(of(product));
    component.ngOnInit();
    expect(component.productCode).not.toBeTruthy();
    expect(component.bundleCode).not.toBeTruthy();
  });

  it('should build pricing data and create cart for product', () => {
    spyOn(formDataService, 'getSubmittedForm').and.returnValue(of(formData));
    spyOn(cartService, 'createCartForProduct').and.stub();
    component.navigateNext(mockCategoryAndStep);
    expect(cartService.createCartForProduct).toHaveBeenCalled();
  });
  it('should go back', () => {
    component.ngOnInit();
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not render navigation buttons if next and previous steps are not defined', () => {
    checkoutConfigService.nextStep = undefined;
    checkoutConfigService.previousStep = undefined;
    component.ngOnInit();

    const previousButton = el.query(By.css('.action-button'));
    const nextButton = el.query(By.css('.primary-button'));
    expect(previousButton).not.toBeTruthy();
    expect(nextButton).not.toBeTruthy();
  });

  it('should not build pricing data and create cart when content of form is missing', () => {
    const mockFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(formDataService, 'getSubmittedForm').and.returnValue(
      of(mockFormData)
    );
    spyOn(cartService, 'createCartForProduct').and.stub();
    component.navigateNext(mockCategoryAndStep);
    expect(cartService.createCartForProduct).not.toHaveBeenCalled();
  });
});
