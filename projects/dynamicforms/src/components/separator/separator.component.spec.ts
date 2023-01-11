import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  UntypedFormControl,
  UntypedFormGroup,
  AbstractControl,
} from '@angular/forms';
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
        default: 'testLabel',
        en: 'testLabel',
      },
      name: 'testName',
    },
  ],
};

const mockFormGroup = new UntypedFormGroup({
  testSeparator: new UntypedFormControl(),
});

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const formControl = new UntypedFormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;
  let formService: FormService;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

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
