import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { FormService } from './../../core/services/form/form.service';
import { TitleComponent } from './title.component';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockField: FieldConfig = {
  fieldType: 'title',
  name: 'testTitle',
  label: {
    en: 'Test Title',
  },
};

const mockFormGroup = new FormGroup({
  testTitle: new FormControl(),
});

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let formService: FormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent],
      imports: [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(TitleComponent);
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

  it('should check components type', () => {
    expect(component.config).toBe(mockField);
    expect(component.config.fieldType).toEqual('title');
  });

  it('should render title component', () => {
    const heading = el.query(By.css('h4')).nativeElement;
    expect(heading).toBeTruthy();
  });
});
