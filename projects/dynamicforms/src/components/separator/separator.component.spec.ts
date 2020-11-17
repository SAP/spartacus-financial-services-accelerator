import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { SeparatorComponent } from './separator.component';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { of } from 'rxjs';
import { LanguageService } from '@spartacus/core';
import { FormService } from './../../core/services/form/form.service';

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

const mockField: FieldConfig = {
  fieldType: 'separator',
  name: 'testName',
  options: [
    {
      label: {
        en: 'testLabel',
      },
      name: 'testName',
    },
  ],
};

const mockFormGroup = new FormGroup({
  testSeparator: new FormControl(),
});

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;
  let formService: FormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeparatorComponent],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
        { provide: FormService, useClass: MockFormService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatorComponent);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.config = mockField;
    component.group = mockFormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
