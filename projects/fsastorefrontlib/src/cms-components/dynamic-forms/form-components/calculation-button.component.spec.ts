import { DebugElement, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  DynamicFormsConfig,
  FieldConfig,
  FormDataService,
  FormDataStorageService,
} from '@fsa/dynamicforms';
import { LanguageService, Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSProduct } from '../../../occ/occ-models/occ.models';
import { CalculationButtonComponent } from './calculation-button.component';

const formDataId = 'formDataId';
const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};
const mockField: FieldConfig = {
  fieldType: 'calculateButton',
  name: 'testButton',
  label: {
    en: 'Test button',
  },
};

class MockOccValueListService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockFormGroup = new FormGroup({
  testButton: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return formDataId;
  }
}

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

class MockFormDataService {
  submit() {}
}

describe('CalculationButtonComponent', () => {
  let component: CalculationButtonComponent;
  let fixture: ComponentFixture<CalculationButtonComponent>;
  let el: DebugElement;
  let currentProductService: CurrentProductService;
  let formDataStorageService: FormDataStorageService;
  let formDataService: FormDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculationButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
      ],
    }).compileComponents();
    currentProductService = TestBed.get(CurrentProductService as Type<
      CurrentProductService
    >);
    formDataStorageService = TestBed.get(FormDataStorageService as Type<
      FormDataStorageService
    >);
    formDataService = TestBed.get(FormDataService as Type<FormDataService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationButtonComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    spyOn(formDataService, 'submit').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.fieldType).toEqual('calculateButton');
  });

  it('should render calculate button component', () => {
    const buttonEl = el.query(By.css('button')).nativeElement;
    expect(buttonEl).toBeTruthy();
  });

  it('should set current category code', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    component.ngOnInit();
    expect(component.categoryCode).toEqual(mockProduct.defaultCategory.code);
  });

  it('should not set current category code', () => {
    const product: FSProduct = {
      code: 'testProduct',
    };
    spyOn(currentProductService, 'getProduct').and.returnValue(of(product));
    component.ngOnInit();
    expect(component.categoryCode).not.toBeTruthy();
  });

  it('should submit form data', () => {
    component.onSubmit();
    expect(formDataService.submit).toHaveBeenCalled();
  });
});
