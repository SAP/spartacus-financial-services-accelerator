import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { FormDataService } from '../../core/services/data/form-data.service';
import { YFormCmsComponent } from '../cms-component.models';
import { FormDataStorageService } from './../../core/services/storage/form-data-storage.service';
import { FormCMSComponent } from './form-cms.component';

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

let formDefinition = {
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
  loadFormData() {}
}

class MockFormDataStorageService {
  getFormDataIdByDefinitionCode() {
    return formDataId;
  }
}

describe('FormCMSComponent', () => {
  let component: FormCMSComponent;
  let fixture: ComponentFixture<FormCMSComponent>;
  let mockFormDataService: FormDataService;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCMSComponent, MockFormComponent, MockSpinnerComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
      ],
    }).compileComponents();
    mockFormDataService = TestBed.inject(FormDataService);
    mockFormDataStorageService = TestBed.inject(FormDataStorageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form without existing data', () => {
    spyOn(
      mockFormDataStorageService,
      'getFormDataIdByDefinitionCode'
    ).and.returnValue(null);
    spyOn(mockFormDataService, 'getFormData').and.callThrough();
    component.ngOnInit();
    expect(mockFormDataService.getFormData).not.toHaveBeenCalled();
  });

  it('should not parse form definition without content', () => {
    spyOn(JSON, 'parse').and.callThrough();
    formDefinition = {
      formId: 'emptyDefinitionId',
      content: undefined,
    };
    spyOn(mockFormDataService, 'getFormDefinition').and.returnValue(
      of(formDefinition)
    );
    expect(JSON.parse).not.toHaveBeenCalled();
  });
});
