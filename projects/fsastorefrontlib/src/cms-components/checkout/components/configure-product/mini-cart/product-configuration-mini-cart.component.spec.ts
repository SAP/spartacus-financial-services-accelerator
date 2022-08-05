import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import { I18nTestingModule, Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { FSProductService } from './../../../../../core/product-pricing/facade/product.service';
import { PricingData } from './../../../../../occ/occ-models/form-pricing.interface';
import { FSProduct } from './../../../../../occ/occ-models/occ.models';
import { ProductConfigurationMiniCartComponent } from './product-configuration-mini-cart.component';
import { FSTranslationService } from '../../../../../core/i18n/facade/translation.service';

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
  formDefinition: {
    content: '{"testFormDefinitionContent":{}}',
  },
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
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

export class MockFormDataService {
  getSubmittedForm() {
    return of(formData);
  }
}

class MockFSProductService {
  getCalculatedProductData(): Observable<Product> {
    return of();
  }
}
class MockPricingService {
  buildPricingData(): PricingData {
    return pricingData;
  }

  buildPricingDataWithformDefinition(): PricingData {
    return pricingData;
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
}

describe('ProductConfigurationMiniCartComponent', () => {
  let component: ProductConfigurationMiniCartComponent;
  let fixture: ComponentFixture<ProductConfigurationMiniCartComponent>;
  let el: DebugElement;
  let currentProductService: CurrentProductService;
  let pricingService: PricingService;
  let formDataService: FormDataService;
  let fsProductService: FSProductService;
  let translationService: FSTranslationService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductConfigurationMiniCartComponent],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
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
            provide: FSProductService,
            useClass: MockFSProductService,
          },
          {
            provide: FSTranslationService,
            useClass: MockFSTranslationService,
          },
        ],
      }).compileComponents();
      currentProductService = TestBed.inject(CurrentProductService);
      formDataService = TestBed.inject(FormDataService);
      pricingService = TestBed.inject(PricingService);
      fsProductService = TestBed.inject(FSProductService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigurationMiniCartComponent);
    translationService = TestBed.inject(FSTranslationService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set active product code and category name', () => {
    spyOn(fsProductService, 'getCalculatedProductData').and.stub();
    component.product$ = of(mockProduct);
    component.ngOnInit();
    expect(component.productId).toEqual(mockProduct.code);
    expect(component.categoryName).toEqual(mockProduct.defaultCategory.name);
  });

  it('should not build pricing data', () => {
    spyOn(fsProductService, 'getCalculatedProductData').and.stub();
    formData.content = undefined;
    component.ngOnInit();
    expect(fsProductService.getCalculatedProductData).not.toHaveBeenCalled();
  });

  it('should not set active product code', () => {
    const product: FSProduct = {
      code: 'testProduct',
    };
    component.product$ = of(product);
    spyOn(fsProductService, 'getCalculatedProductData').and.stub();
    component.ngOnInit();
    expect(component.productId).not.toBeTruthy();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
  it('should find translation for key', () => {
    spyOn(translationService, 'getTranslationValue').and.returnValue(
      'test value'
    );
    const translationValue = component.getTranslation(
      'insurances_auto',
      'vehicleMake'
    );
    expect(translationValue).toEqual('test value');
  });
});
