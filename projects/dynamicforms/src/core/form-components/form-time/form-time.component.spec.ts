import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTimeComponent } from './form-time.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormGenericComponent } from '../form-generic.component';
import { FormConfig } from '../../models';
import { OccMockFormService } from '../../../occ/services/occ-mock-form.service';

@Component({
  template: '',
  selector: 'cx-form-error-notice',
})
class ErrorNoticeComponent {
  @Input() warn;
  @Input() parentConfig;
}

export class MockFormConfig { }

const mockFieldOption = [];
const mockVal = [];

export class MockOccMockFormService {
  setInitialFormControlValues() {
    return mockFieldOption;
  }
  getDropdownValues() {
    return mockFieldOption;
  }
  getNodes() {
    return mockVal;
  }
}

class MockFormElementClass {
  controlElement = 'testClass';
}

class MockGenericComponent { }

describe('FormTimeComponent', () => {
  let component: FormTimeComponent;
  let fixture: ComponentFixture<FormTimeComponent>;
  let mockFormConfig: MockFormConfig;
  let mockFormElementClass: MockFormElementClass;
  let mockOccMockFormService: OccMockFormService;

  let mockGenericComponent: MockGenericComponent;

  beforeEach(async(() => {
    mockFormConfig = new MockFormConfig();
    mockOccMockFormService = new MockOccMockFormService();
    mockGenericComponent = new MockGenericComponent();
    mockFormElementClass = new MockFormElementClass();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormTimeComponent, ErrorNoticeComponent],
      providers: [
        {
          provide: FormGenericComponent,
          useValue: mockGenericComponent,
        },
        {
          provide: FormGenericComponent,
          useValue: mockFormElementClass,
        },
        {
          provide: FormConfig,
          useValue: mockFormConfig,
        },
        {
          provide: OccMockFormService,
          useValue: mockOccMockFormService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});