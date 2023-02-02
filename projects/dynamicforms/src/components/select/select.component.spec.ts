import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { SelectComponent } from './select.component';
import { FormService } from './../../core/services/form/form.service';

@Component({
  // eslint-disable-next-line
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
const mockField: FieldConfig = {
  fieldType: 'select',
  name: 'testSelect',
  label: {
    default: 'testLabel',
    en: 'TestLabel',
  },
  options: [],
};

const formControl = new UntypedFormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new UntypedFormGroup({
  dependentTestField: new UntypedFormControl(),
  testSelect: new UntypedFormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SelectComponent, MockErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
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
    fixture = TestBed.createComponent(SelectComponent);
    formService = TestBed.inject(FormService);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render select component', () => {
    const selectComponent = el.query(By.css('select')).nativeElement;
    expect(selectComponent).toBeTruthy();
  });
});
