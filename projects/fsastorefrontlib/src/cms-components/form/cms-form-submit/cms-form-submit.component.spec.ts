import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { CmsComponent, CmsComponentConnector } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CmsFormSubmitComponent } from './../../../occ/occ-models/cms-component.models';
import { CMSFormSubmitComponent } from './cms-form-submit.component';

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

const componentData: CmsFormSubmitComponent = {
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
}

class MockFormDataStorageService {
  getFormDataId() {
    return null;
  }
  getFormDataIdByDefinitionCode() {}
}
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

describe('CMSFormSubmitComponent', () => {
  let formSubmitComponent: CMSFormSubmitComponent;
  let fixture: ComponentFixture<CMSFormSubmitComponent>;
  let el: DebugElement;
  let mockCmsComponentConnector: CmsComponentConnector;
  let mockFormDataService: FormDataService;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
          CMSFormSubmitComponent,
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
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
        ],
      }).compileComponents();
      mockCmsComponentConnector = TestBed.inject(CmsComponentConnector);
      mockFormDataService = TestBed.inject(FormDataService);
      mockFormDataStorageService = TestBed.inject(FormDataStorageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSFormSubmitComponent);
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
