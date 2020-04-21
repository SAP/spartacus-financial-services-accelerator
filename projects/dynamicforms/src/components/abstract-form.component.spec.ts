import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../occ/services/occ-mock-form.service';
import { DynamicFormsConfig, CssClass } from '../core/config/form-config';
import { FieldConfig } from '../core/models/form-config.interface';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { AbstractFormComponent } from '.';

const mockCssClass: CssClass = {
  formTitle: 'testTitle',
};

class MockOccFormService {}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockField: FieldConfig = {
  type: 'abstract',
  name: 'testTitle',
  label: {
    en: 'Test string',
  },
};

const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {
      title: {
        component: AbstractFormComponent,
      },
    },
  },
};

describe('AbstractFormComponent', () => {
  let component: AbstractFormComponent;
  let fixture: ComponentFixture<AbstractFormComponent>;

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractFormComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set label', () => {
    expect(component.label).toEqual('Test string');
  });
});
