import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDataService, FormDataStorageService } from '@fsa/dynamicforms';
import {
  ActiveCartService,
  Cart,
  CmsComponent,
  I18nTestingModule,
  UserToken,
  AuthService,
} from '@spartacus/core';
import { CmsComponentData, SpinnerModule } from '@spartacus/storefront';
import { of, Observable } from 'rxjs';
import { FormDefinitionType } from '../../../occ/occ-models';
import { FSProduct } from './../../../occ/occ-models/occ.models';
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
  loadFormDefinitions(category, type) {
    return of(formDefinition);
  }
}
class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
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
  formSubject;
  @Input()
  formConfig;
  @Input()
  applicationId;
  @Input()
  formData;
}

const mockProduct: FSProduct = {
  defaultCategory: { code: 'category' },
};

const mockCart: Cart = {
  code: 'cartCode',
  entries: [
    {
      product: mockProduct,
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
  uid: 'TestPersonalDetailsComponent',
  typeCode: 'PersonalDetailsComponent',
  applicationId: 'applicationId',
};
const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};
class MockFormDataStorageService {
  getFormDataIdByDefinitionCode() {}
}
describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  let mockFormDataService: FormDataService;
  let mockActiveCartService: ActiveCartService;

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
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();

    mockFormDataService = TestBed.inject(FormDataService);
    mockActiveCartService = TestBed.inject(ActiveCartService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form definition data', () => {
    spyOn(mockFormDataService, 'loadFormDefinitions').and.callThrough();
    spyOn(mockFormDataService, 'getFormDefinition').and.callThrough();
    spyOn(mockActiveCartService, 'getActive').and.returnValue(of(mockCart));
    component.ngOnInit();
    expect(mockFormDataService.loadFormDefinitions).toHaveBeenCalledWith(
      'category',
      FormDefinitionType.PERSONAL_DETAILS
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

  it('should not load form definition data without category', () => {
    spyOn(mockFormDataService, 'loadFormDefinitions').and.callThrough();
    spyOn(mockActiveCartService, 'getActive').and.returnValue(
      of(mockCartWithoutCategory)
    );
    component.ngOnInit();
    expect(mockFormDataService.loadFormDefinitions).not.toHaveBeenCalled();
  });
});
