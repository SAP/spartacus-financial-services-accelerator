import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { YFormData, FormDefinition } from '../../models';
import { FormDataService } from '../../services/data/form-data.service';
import { FormComponent } from './form.component';
import { FormDataStorageService } from '../../services/storage/form-data-storage.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { Component } from '@angular/core';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  template: '',
  providers: [
    {
      provide: DynamicFormComponent,
      useClass: MockDynamicFormComponent,
    },
  ],
})
export class MockDynamicFormComponent {
  valid() {
    return true;
  }
}

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
  formDefinition: {
    formId: 'testId',
  },
};

const mockFormCategoryCode = 'testCategoryCode';
const mockFormId = 'testFormID';
const mockFormConfig: FormDefinition = {
  formGroups: [],
  formId: 'testFormID',
};
const mockApplicationId = 'testApplicationId';

export class MockFormDataService {
  saveFormData(testObj) {}
  getFormData() {
    return of(formData);
  }
  setSubmittedForm() {}
}

export class MockFormDataStorageService {
  getFormDataIdByDefinitionCode(code) {
    return 'testId';
  }
  setFormDataToLocalStorage() {}
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockFormDataService: MockFormDataService;
  let mockFormDataStorageService: MockFormDataStorageService;

  beforeEach(async(() => {
    mockFormDataService = new MockFormDataService();
    mockFormDataStorageService = new MockFormDataStorageService();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [FormComponent, MockDynamicFormComponent],
      providers: [
        {
          provide: FormDataService,
          useValue: mockFormDataService,
        },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
        {
          provide: DynamicFormComponent,
          useValue: MockDynamicFormComponent,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.formCategoryCode = mockFormCategoryCode;
    component.formId = mockFormId;
    component.formConfig = mockFormConfig;
    component.applicationId = mockApplicationId;
    component.formData = of(formData);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    spyOn(mockFormDataService, 'saveFormData');
    component.submit(formData);
    expect(mockFormDataService.saveFormData).toHaveBeenCalledWith({
      formDefinition: {
        formId: mockFormConfig.formId,
        applicationId: mockApplicationId,
      },
      content: formData.content,
      refId: formData.refId,
      id: 'testId',
    });
  });

  it('should not submit when formData content is not defined', () => {
    const formDataMissingContent: YFormData = {
      id: 'test-formData',
      type: 'DATA',
      formDefinition: {
        formId: 'testId',
      },
    };
    spyOn(mockFormDataService, 'saveFormData');
    component.formData = of(null);
    component.submit(formDataMissingContent);
    expect(mockFormDataService.saveFormData).not.toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
