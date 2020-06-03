import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Type } from '@angular/core';
import { CmsComponentData, SpinnerModule } from '@spartacus/storefront';
import {
  ActiveCartService,
  CmsComponent,
  I18nTestingModule,
} from '@spartacus/core';
import { FormDataService, FormDataStorageService } from '@fsa/dynamicforms';
import { of } from 'rxjs';
import { PersonalDetailsComponent } from './personal-details.component';

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
  loadFormDefinitionByCategory(category, type) {
    return of(formDefinition);
  }
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
const mockCart = {
  code: 'cartCode',
  entries: [
    {
      product: {
        defaultCategory: { code: 'category' },
      },
    },
  ],
};
const mockCartWithoutCategory = {
  code: 'cartCode',
  entries: [
    {
      product: {},
    },
  ],
};
class MockActiveCartService {
  getActive() {
    return of();
  }
}
const componentData = {
  uid: 'TestCMSFormSubmitComponent',
  typeCode: 'PersonalDetailsComponent',
  formId: 'formId',
  applicationId: 'applicationId',
  category: {
    code: 'testCategory',
  },
};
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};
class MockFormDataStorageService {
  getFormDataId() {
    return null;
  }
  getFormDataIdByDefinitionCode() {}
}
describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  let mockFormDataService: MockFormDataService;
  let mockActiveCartService: MockActiveCartService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, I18nTestingModule],
      declarations: [MockFormComponent, PersonalDetailsComponent],
      providers: [
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
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
    mockActiveCartService = TestBed.get(ActiveCartService as Type<
      ActiveCartService
    >);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load component data', () => {
    spyOn(
      mockFormDataService,
      'loadFormDefinitionByCategory'
    ).and.callThrough();
    spyOn(mockFormDataService, 'getFormDefinition').and.callThrough();
    spyOn(mockActiveCartService, 'getActive').and.returnValue(of(mockCart));
    component.ngOnInit();
    expect(
      mockFormDataService.loadFormDefinitionByCategory
    ).toHaveBeenCalledWith('category', 'PERSONAL_DETAILS');
    expect(mockFormDataService.getFormDefinition).toHaveBeenCalled();
    let result;
    component.formDefinition$.subscribe(value => (result = value));
    expect(result).toEqual(formDefinition);
  });

  it('should not load component data', () => {
    spyOn(mockFormDataService, 'getFormDefinition').and.returnValue(
      of(formDefinitionUndefined)
    );
    component.ngOnInit();
    let result;
    component.formDefinition$.subscribe(value => (result = value));
    expect(result).toEqual(formDefinitionUndefined);
    component.subscription = undefined;
    component.ngOnDestroy();
  });
  it('should not load component data without category', () => {
    spyOn(
      mockFormDataService,
      'loadFormDefinitionByCategory'
    ).and.callThrough();
    spyOn(mockActiveCartService, 'getActive').and.returnValue(
      of(mockCartWithoutCategory)
    );
    component.ngOnInit();
    expect(
      mockFormDataService.loadFormDefinitionByCategory
    ).not.toHaveBeenCalled();
  });
});
