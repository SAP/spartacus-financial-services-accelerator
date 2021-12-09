import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { CmsComponent, I18nTestingModule } from '@spartacus/core';
import { CmsComponentData, SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { FormDefinitionType } from '../../../occ/occ-models';
import { GeneralInformationComponent } from './general-information.component';
import { FSCart } from './../../../occ/occ-models/occ.models';
import { FSCartService } from '../../../../src/core/cart/facade/cart.service';

const componentData = {
  uid: 'TestGeneralInformationComponent',
  typeCode: 'GeneralInformationComponent',
  applicationId: 'applicationId',
};
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};
const mockCart: FSCart = {
  code: 'testCart',
  insuranceQuote: {
    quoteDetails: {
      formId: 'testFormDataId',
    },
    state: {
      code: 'UNBIND',
    },
  },
};
const formDefinition = {
  formId: 'formId',
  content: '{}',
};
const formDefinitionUndefined = {
  formId: 'formId',
  content: undefined,
};
const mockParams = {
  formCode: 'insurance_category',
};

class MockFormDataService {
  getFormDefinition() {
    return of(formDefinition);
  }
  loadFormDefinitions(category, type) {
    return of(formDefinition);
  }
  loadFormData() {}
  getFormData() {}
}

class MockActivatedRoute {
  params = of(mockParams);
}

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

class MockFormDataStorageService {
  getFormDataIdByDefinitionCode() {}
}

class MockCartService {
  getActive(): any {
    return of(mockCart);
  }
}

describe('GeneralInformationComponent', () => {
  let component: GeneralInformationComponent;
  let fixture: ComponentFixture<GeneralInformationComponent>;
  let mockFormDataService: FormDataService;
  let mockCartService: FSCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SpinnerModule, I18nTestingModule],
        declarations: [MockFormComponent, GeneralInformationComponent],
        providers: [
          {
            provide: FormDataService,
            useClass: MockFormDataService,
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
        ],
      }).compileComponents();

      mockFormDataService = TestBed.inject(FormDataService);
      mockCartService = TestBed.inject(FSCartService);
      spyOn(mockFormDataService, 'loadFormData').and.callThrough();
      spyOn(mockFormDataService, 'getFormData').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form data', () => {
    component.ngOnInit();
    expect(mockFormDataService.loadFormData).toHaveBeenCalled();
  });

  it('should load form definition data', () => {
    spyOn(mockFormDataService, 'loadFormDefinitions').and.callThrough();
    spyOn(mockFormDataService, 'getFormDefinition').and.callThrough();
    component.ngOnInit();
    expect(mockFormDataService.loadFormDefinitions).toHaveBeenCalledWith(
      mockParams.formCode,
      FormDefinitionType.PRODUCT_CONFIGURE
    );
    expect(mockFormDataService.getFormDefinition).toHaveBeenCalled();
    let result;
    component.formDefinition$.subscribe(value => (result = value));
    expect(result).toEqual(formDefinition);
  });

  it('should not load form definition data', () => {
    spyOn(mockFormDataService, 'getFormDefinition').and.returnValue(
      of(formDefinitionUndefined)
    );
    component.ngOnInit();
    let result;
    component.formDefinition$.subscribe(value => (result = value));
    expect(result).toEqual(formDefinitionUndefined);
  });
});
