import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { Input, Component, DebugElement } from '@angular/core';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsConfig } from '../../core';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'checkbox',
  name: 'testcheckbox',
  options: [
    {
      label: 'testOptionLabel',
      name: 'testOptionName',
    },
  ],
  label: {
    en: 'Test',
  },
};

const mockFormGroup = new FormGroup({
  testcheckbox: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, MockErrorNoticeComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
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
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
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
