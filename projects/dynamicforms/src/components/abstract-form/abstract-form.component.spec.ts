import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { Type, Injector } from '@angular/core';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { AbstractFormComponent } from './abstract-form.component';
import { FieldConfig } from '../../core/models/form-config.interface';

class MockOccFormService {}

const mockUserServiceResponse = {
  firstName: "Donna",
  lastName: "Moore"
}
let MockUserService = {
  get() {
      return of(mockUserServiceResponse)
  }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}
class mockPrefillResolver {
  getFieldValue() {
    return of('Donna');
  }
}
const enLabel = 'En test string';
const defaultLabel = 'Test string';
const mockCssClass = 'testClass';

const mockField: FieldConfig = {
  fieldType: 'abstract',
  name: 'testTitle',
  label: {},
  prefillValue: {
    targetObject: 'user',
    targetValue: 'titleCode'
  },
}

class MockInjector {
  get<PrefilResolver>() {
    return mockPrefillResolver;
  }
}
const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});
class MockDynamicFormsConfig {
  dynamicForms: {
    prefill: {
      user: {
        prefillResolver: 
          mockPrefillResolver
      }
    }
  }
}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    prefill: {
      user: {
        prefillResolver:
        MockUserService
      }
    }
  },
};

describe('AbstractFormComponent', () => {
  let component: AbstractFormComponent;
  let fixture: ComponentFixture<AbstractFormComponent>;
  let mockLanguageService: LanguageService;
  let injector: Injector;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractFormComponent],
      imports: [ReactiveFormsModule, ],
      providers: [
        { provide: OccValueListService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: Injector, useClass: MockInjector },
        { provide: DynamicFormsConfig, useValue: MockDynamicFormsConfig },
      ],
    }).compileComponents();
    mockLanguageService = TestBed.get(LanguageService as Type<LanguageService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractFormComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default label', () => {
    component.config = mockField;
    component.config.cssClass = mockCssClass;
    mockField.label.default = defaultLabel;
    component.ngOnInit();
    expect(component.hostComponentClass).toEqual('col-12 testClass');
    expect(component.label).toEqual(defaultLabel);
  });

  it('should set english label', () => {
    component.config = mockField;
    component.config.cssClass = mockCssClass;
    mockField.label.default = enLabel;
    component.ngOnInit();
    expect(component.hostComponentClass).toEqual('col-12 testClass');
    expect(component.label).toEqual(enLabel);
  });
});
