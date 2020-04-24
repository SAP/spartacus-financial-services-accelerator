import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { DynamicFormsConfig } from '../core/config/form-config';
import { FieldConfig } from '../core/models/form-config.interface';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { AbstractFormComponent } from '.';
import { Type } from '@angular/core';

class MockOccFormService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const enLabel = 'En test string';
const defaultLabel = 'Test string';
const mockCssClass = 'testClass';

const mockField: FieldConfig = {
  type: 'abstract',
  name: 'testTitle',
  label: {},
};

const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('AbstractFormComponent', () => {
  let component: AbstractFormComponent;
  let fixture: ComponentFixture<AbstractFormComponent>;
  let mockLanguageService: LanguageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
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
