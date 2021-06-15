import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@spartacus/dynamicforms';
import { I18nTestingModule, Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { PricingData } from './../../../../../occ/occ-models/form-pricing.interface';
import { FSProduct } from './../../../../../occ/occ-models/occ.models';
import { ProductConfigurationNavigationComponent } from './product-configuration-navigation.component';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

const formDataId = 'formDataId';
const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
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
  continueToNextStep$ = of(true);
  formGroup = of({ valid: true });
  getSubmittedForm() {
    return of();
  }
  submit() {}
  setContinueToNextStep(continueToNextStep) {}
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

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductConfigurationNavigationComponent,
          MockTranslatePipe,
        ],
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
        ],
      }).compileComponents();
      currentProductService = TestBed.inject(CurrentProductService);
      formDataService = TestBed.inject(FormDataService);
      formDataStorageService = TestBed.inject(FormDataStorageService);
      pricingService = TestBed.inject(PricingService);
      cartService = TestBed.inject(FSCartService);
      routingService = TestBed.inject(RoutingService);
      spyOn(routingService, 'go').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigurationNavigationComponent);
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
    component.navigateNext(new UIEvent('click'));
    expect(cartService.createCartForProduct).toHaveBeenCalled();
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
    component.navigateNext(new UIEvent('click'));
    expect(cartService.createCartForProduct).not.toHaveBeenCalled();
  });
});
