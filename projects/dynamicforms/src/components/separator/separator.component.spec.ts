import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { SeparatorComponent } from './separator.component';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { of } from 'rxjs';
import { LanguageService } from '@spartacus/core';

class MockOccValueListService {}

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

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeparatorComponent],
      providers: [
        { provide: OccValueListService, useClass: MockOccValueListService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatorComponent);
    component = fixture.componentInstance;
    component.config = mockField;
    component.group = mockFormGroup;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
