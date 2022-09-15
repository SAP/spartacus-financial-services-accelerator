import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@spartacus/dynamicforms';
import { I18nTestingModule, Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  ConfiguratorType,
  FSCategory,
  FSProduct,
} from './../../../../../occ/occ-models/occ.models';
import { ProductConfigurationFormComponent } from './product-configuration-form.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-form-component',
  template: '',
})
class MockFormComponent {
  @Input()
  formCategoryCode;
  @Input()
  formId;
  @Input()
  formSubject;
  @Input()
  formConfig;
  @Input()
  applicationId;
  @Input()
  formData;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

const formDataId = 'formDataId';
const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};
const formDefinition = {
  formId: 'formDefinition1',
  content: '{ "formGroup": "testGroup" }',
  subject: 'Test subject',
};

const configurationCategory: FSCategory = {
  code: 'testCategory',
  yformConfiguratorSettings: [
    {
      configurationFormId: 'formDefinition1',
      configuratorType: ConfiguratorType.PRODUCT_CONFIGURE_FORM,
    },
  ],
};
const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
    name: 'Test Category',
  },
  categories: [configurationCategory],
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

export class MockFormDataService {
  getFormDefinition() {
    return of(formDefinition);
  }
  loadFormDefinition() {}
  getFormData() {
    return of(formData);
  }
  loadFormData() {}
}

class MockFormDataStorageService {
  getFormDataIdByDefinitionCode() {}
}

describe('ProductConfigurationFormComponent', () => {
  let component: ProductConfigurationFormComponent;
  let fixture: ComponentFixture<ProductConfigurationFormComponent>;
  let el: DebugElement;
  let formDataStorageService: FormDataStorageService;
  let formDataService: FormDataService;
  let currentProductService: CurrentProductService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductConfigurationFormComponent,
          MockFormComponent,
          MockSpinnerComponent,
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
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();
      currentProductService = TestBed.inject(CurrentProductService);
      formDataService = TestBed.inject(FormDataService);
      formDataStorageService = TestBed.inject(FormDataStorageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigurationFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form definition and get form data', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    spyOn(
      formDataStorageService,
      'getFormDataIdByDefinitionCode'
    ).and.returnValue(formDataId);
    component.ngOnInit();
    expect(component.formCategory).toEqual(mockProduct.defaultCategory.code);
    expect(component.formDefinitionId).toEqual(
      configurationCategory.yformConfiguratorSettings[0].configurationFormId
    );
    component.formData$
      .subscribe(result => {
        expect(result).toEqual(formData);
      })
      .unsubscribe();
  });

  it('should not get form data', () => {
    spyOn(formDataService, 'loadFormData').and.stub();
    spyOn(
      formDataStorageService,
      'getFormDataIdByDefinitionCode'
    ).and.returnValue(undefined);
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));

    component.ngOnInit();
    expect(formDataService.loadFormData).not.toHaveBeenCalled();
  });

  it('should not load form definition', () => {
    const product: FSProduct = {
      code: 'testProduct',
      defaultCategory: {
        code: 'testCategory',
        name: 'Test Category',
      },
    };
    spyOn(currentProductService, 'getProduct').and.returnValue(of(product));
    component.ngOnInit();
    expect(component.formCategory).not.toBeTruthy();
    expect(component.formDefinitionId).not.toBeTruthy();
  });
});
