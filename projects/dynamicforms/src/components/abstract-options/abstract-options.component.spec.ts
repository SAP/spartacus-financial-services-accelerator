import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractOptionsComponent } from './abstract-options.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core';
import { of } from 'rxjs';
import { FieldConfig } from './../../core/models/form-config.interface';
import { FormService } from './../../core/services/form/form.service';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const firstOption = 'firstOption';
const secondOption = 'secondOption';

const mockField: FieldConfig = {
  fieldType: 'radio',
  name: 'testRadio',
  options: [
    {
      name: firstOption,
      label: {
        default: 'First Option',
      },
    },
    {
      name: secondOption,
      label: {
        default: 'Second Option',
      },
      selected: true,
    },
  ],
};

const formControl = new FormControl('formValue');

class MockFormService {
  getFormControlForCode(): AbstractControl {
    return formControl;
  }
}

const mockFormGroup = new FormGroup({
  testRadio: new FormControl(),
});

const mockLocalizationObj = {
  en: 'Test en',
  de: 'Test de',
};

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('AbstractOptionsComponent', () => {
  let component: AbstractOptionsComponent;
  let fixture: ComponentFixture<AbstractOptionsComponent>;
  let formService: FormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractOptionsComponent],
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
    fixture = TestBed.createComponent(AbstractOptionsComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    component.group = mockFormGroup;
    component.config = mockField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockFormGroup.get(mockField.name).value).toEqual(secondOption);
  });

  it('should check localizedoption when laguage is set to en', () => {
    const localizedOption = component.getLocalizedOption(
      mockLocalizationObj,
      'en'
    );
    expect(localizedOption).toEqual(mockLocalizationObj.en);
  });

  it('should check localizedoption when laguage is set to de', () => {
    const localizedOption = component.getLocalizedOption(
      mockLocalizationObj,
      'de'
    );
    expect(localizedOption).toEqual(mockLocalizationObj.de);
  });
});
