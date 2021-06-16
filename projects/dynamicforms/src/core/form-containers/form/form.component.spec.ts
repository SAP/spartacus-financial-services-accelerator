import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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

const categoryCode = 'testCategoryCode';
const formId = 'testFormId';
const applicationId = 'testApplicationId';

const formData: YFormData = {
  id: formId,
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
  formDefinition: {
    formId: formId,
  },
};

const formConfig: FormDefinition = {
  formGroups: [],
  formId: formId,
};

export class MockFormDataService {
  saveFormData(testObj) {}
  getFormData() {
    return of(formData);
  }
  submit() {}
}

export class MockFormDataStorageService {
  getFormDataIdByDefinitionCode(code) {
    return formId;
  }
  setFormDataToLocalStorage() {}
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockFormDataService: MockFormDataService;

  beforeEach(
    waitForAsync(() => {
      mockFormDataService = new MockFormDataService();
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
        ],
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(FormComponent);
      component = fixture.componentInstance;
      component.formCategoryCode = categoryCode;
      component.formId = formId;
      component.formConfig = formConfig;
      component.applicationId = applicationId;
      component.formData = of(formData);
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', () => {
    spyOn(mockFormDataService, 'saveFormData');
    component.submit(formData);
    expect(mockFormDataService.saveFormData).toHaveBeenCalledWith({
      formDefinition: {
        formId: formConfig.formId,
        applicationId: applicationId,
      },
      content: formData.content,
      refId: formData.refId,
      id: formId,
    });
  });

  it('should not submit when formData content is not defined', () => {
    const formDataMissingContent: YFormData = {
      id: 'test-formData',
      type: 'DATA',
      formDefinition: {
        formId: formId,
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
