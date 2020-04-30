import { DebugElement, Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsComponent, CmsComponentConnector } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsFormSubmitComponent } from './cms-form-submit.component';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSFormSubmitComponent } from './../../../occ/occ-models/cms-component.models';
import { FormDataService } from '@fsa/dynamicforms';
import { LoadFormDefinition } from 'projects/dynamicforms/src/core/store';

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

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

const componentData: CMSFormSubmitComponent = {
  uid: 'TestCMSFormSubmitComponent',
  typeCode: 'CMSFormSubmitComponent',
  formId: 'formId',
  applicationId: 'applicationId',
  category: {
    code: 'testCategory',
  },
};

const formDefinition = {
  formId: 'formId',
};

class MockCmsComponentConnector {
  get() {
    return of(componentData);
  }
}

class MockFormDataService {
  getFormDefinition() {
    return of(formDefinition);
  }

  loadFormDefinition() {}

  getFormDataIdFromLocalStorage() {
    return null;
  }
}

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

describe('CmsFormSubmitComponent', () => {
  let formSubmitComponent: CmsFormSubmitComponent;
  let fixture: ComponentFixture<CmsFormSubmitComponent>;
  let el: DebugElement;
  let mockCmsComponentConnector: MockCmsComponentConnector;
  let mockFormDataService: MockFormDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CmsFormSubmitComponent,
        MockFormComponent,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: CmsComponentConnector,
          useClass: MockCmsComponentConnector,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
      ],
    }).compileComponents();
    mockCmsComponentConnector = TestBed.get(CmsComponentConnector as Type<
      CmsComponentConnector
    >);
    mockFormDataService = TestBed.get(FormDataService as Type<FormDataService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsFormSubmitComponent);
    formSubmitComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create form submit component', () => {
    expect(formSubmitComponent).toBeTruthy();
  });

  it('should load component data', () => {
    spyOn(mockCmsComponentConnector, 'get').and.callThrough();
    spyOn(mockFormDataService, 'loadFormDefinition').and.callThrough();
    formSubmitComponent.ngOnInit();
    expect(mockFormDataService.loadFormDefinition).toHaveBeenCalled();
    expect(mockCmsComponentConnector.get).toHaveBeenCalled();
  });
});
