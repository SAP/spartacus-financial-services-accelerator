import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { CssClass, DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { RadioComponent } from './radio.component';
import { of } from 'rxjs';

@Component({
  // tslint:disable
  selector: 'cx-error-notice',
  template: '',
})
class MockErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

const mockCssClass: CssClass = {
  radioLabel: 'testRadioInputLabel',
};

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockOccFormService {}

const mockField: FieldConfig = {
  type: 'radio',
  name: 'testRadio',
  label: {
    en: 'What time did it happen?',
  },
};

const mockFormGroup = new FormGroup({
  testRadio: new FormControl(),
});

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    cssClass: mockCssClass,
    components: {
      radio: {
        component: RadioComponent,
      },
    },
  },
};

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent, MockErrorNoticeComponent],
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
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.group = mockFormGroup;
    component.config = mockField;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.type).toEqual('radio');
  });

  it('should render radio component', () => {
    const radioComponent = el.query(By.css('.testRadioInputLabel'))
      .nativeElement;
    expect(radioComponent).toBeTruthy();
  });
});
