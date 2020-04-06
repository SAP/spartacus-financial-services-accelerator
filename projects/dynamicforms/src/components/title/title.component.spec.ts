import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { FormConfig, CssClass } from '../../core/config/form-config';
import { FieldConfig } from '../../core';

import { TitleComponent } from './title.component';

const mockData: Observable<any> = of({});

const mockCssClass: CssClass = {
  form: '',
  formTitle: 'testTitle',
};

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
  type: 'title',
  name: 'testGroup',
  label: 'Test Title',
  group: {
    fieldConfigs: [
      {
        type: 'title',
      },
    ],
    groupCode: 'testGroup',
  },
};

const mockFormGroup = new FormGroup({
  testGroup: new FormControl(),
});

const mockFormConfig: FormConfig = {
  cssClass: mockCssClass,
  components: {
    title: {
      component: TitleComponent,
    },
  },
};

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let mockOccFormService: MockOccFormService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccMockFormService, useValue: mockOccFormService },
        {
          provide: FormConfig,
          useValue: mockFormConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    mockOccFormService = new MockOccFormService();
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
    expect(component.config.type).toEqual('title');
  });

  it('should render title component', () => {
    const heading = el.query(By.css('.testTitle')).nativeElement;
    expect(heading).toBeTruthy();
  });
});
