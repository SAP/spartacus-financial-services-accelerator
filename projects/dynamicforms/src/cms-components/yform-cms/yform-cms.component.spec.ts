import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { YFormCMSComponent } from './yform-cms.component';
import { Component, Input, Type } from '@angular/core';
import { YFormCmsComponent } from '../cms-component.models';
import { of } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsComponent } from '@spartacus/core';
import { FormDataService } from './../../core/services/data/form-data.service';

@Component({
  selector: 'cx-form-component',
  template: '',
})
class MockFormComponent {
  @Input()
  formCategoryCode;
  @Input()
  formId;
  @Input()
  formConfig;
  @Input()
  applicationId;
  @Input()
  formData;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

const componentData: YFormCmsComponent = {
  uid: 'TestYFormCmsComponent',
  typeCode: 'YFormCmsComponent',
  name: 'Test YForm Component',
  formId: 'form1',
  applicationId: 'application1',
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

const formDefinition = {
  formId: 'formDefinition1',
  content: '{ "formGroup": "testGroup" }',
};

const formDataId = 'formDataId';

const formData = {
  formDataId: formDataId,
  content: 'formDataContent',
};

class MockFormDataService {
  getFormDefinition() {
    return of(formDefinition);
  }
  loadFormDefinition() {}

  getFormData() {
    return formData;
  }

  getFormDataIdFromLocalStorage() {
    return formDataId;
  }
}

describe('YFormCMSComponent', () => {
  let component: YFormCMSComponent;
  let fixture: ComponentFixture<YFormCMSComponent>;
  let mockFormDataService: FormDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        YFormCMSComponent,
        MockFormComponent,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
      ],
    }).compileComponents();
    mockFormDataService = TestBed.get(FormDataService as Type<FormDataService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YFormCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form without existing data', () => {
    spyOn(mockFormDataService, 'getFormDataIdFromLocalStorage').and.returnValue(
      null
    );
    spyOn(mockFormDataService, 'getFormData').and.callThrough();
    component.ngOnInit();
    expect(mockFormDataService.getFormData).not.toHaveBeenCalled();
  });

  it('should not parse form definition without content', () => {
    const emptyFormDefinition = {
      formId: 'emptyDefinitionId',
    };
    expect(component.getFormConfig(emptyFormDefinition)).toEqual(null);
  });
});
