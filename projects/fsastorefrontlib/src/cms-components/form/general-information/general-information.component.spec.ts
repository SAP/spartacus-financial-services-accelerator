import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormDataService, FormDataStorageService } from '@fsa/dynamicforms';
import { Component, Input, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsComponentData, SpinnerModule } from '@spartacus/storefront';
import { CmsComponent, I18nTestingModule } from '@spartacus/core';
import { GeneralInformationComponent } from './general-information.component';
import { FormDefinitionType } from '../../../occ/occ-models';

const formDefinition = {
  formId: 'formId',
  content: '{}',
};
const formDefinitionUndefined = {
  formId: 'formId',
  content: undefined,
};
class MockFormDataService {
  getFormDefinition() {
    return of(formDefinition);
  }
  loadFormDefinitions(category, type) {
    return of(formDefinition);
  }
}
const mockParams = {
  formCode: 'insurance_category',
};
class MockActivatedRoute {
  params = of(mockParams);
}
@Component({
  // tslint:disable-next-line: component-selector
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
const componentData = {
  uid: 'TestGeneralInformationComponent',
  typeCode: 'GeneralInformationComponent',
  applicationId: 'applicationId',
};
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};
class MockFormDataStorageService {
  getFormDataIdByDefinitionCode() {}
}
describe('GeneralInformationComponent', () => {
  let component: GeneralInformationComponent;
  let fixture: ComponentFixture<GeneralInformationComponent>;
  let mockFormDataService: MockFormDataService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();

    mockFormDataService = TestBed.get(FormDataService as Type<FormDataService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
