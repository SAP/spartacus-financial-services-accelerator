import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Input, Component, DebugElement } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { of } from 'rxjs';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { CheckboxComponent } from './checkbox.component';
import { FieldConfig } from '../../core/models/form-config.interface';
import { DynamicFormsConfig } from '../../core';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { FormService } from './../../core/services/form/form.service';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockOccValueListService {}

const mockField: FieldConfig = {
  fieldType: 'checkbox',
  name: 'testcheckbox',
  options: [
    {
      label: {
        en: 'testOptionLabel',
      },
      name: 'testOptionName',
    },
  ],
  label: {
    en: 'Test',
  },
};

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new FormGroup({
  testcheckbox: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        { provide: OccValueListService, useClass: MockOccValueListService },
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
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should checkbox component', () => {
    const checkboxComponent = el.query(By.css('input[type="checkbox"]'))
      .nativeElement;
    expect(checkboxComponent).toBeTruthy();
  });
});
