import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

import { ErrorNoticeComponent } from './error-notice.component';

const mockData: Observable<any> = of({});

class MockOccFormService {
  setInitialFormControlValues() {
    return mockData;
  }

  getDropdownValues() {
    return mockData;
  }

  getNodes() {
    return mockData;
  }
}
const mockField: FieldConfig = {
  type: 'textarea',
  name: 'testGroup',
  label: 'What time did it happen?',
  group: {
    fieldConfigs: [
      {
        type: 'textarea',
      },
    ],
    groupCode: 'testGroup',
  },
};

describe('ErrorNoticeComponent', () => {
  let component: ErrorNoticeComponent;
  let fixture: ComponentFixture<ErrorNoticeComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNoticeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccMockFormService, useValue: mockOccFormService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoticeComponent);
    component = fixture.componentInstance;
    mockOccFormService = new MockOccFormService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
