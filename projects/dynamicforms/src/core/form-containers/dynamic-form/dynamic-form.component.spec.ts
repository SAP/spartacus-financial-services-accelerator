import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { Directive, Input } from '@angular/core';
import { FieldConfig } from '../../models/form-config.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { BehaviorSubject } from 'rxjs';
import { FormDataService } from '../../services/data/form-data.service';
import { YFormData } from '../../models';
import { DynamicFormsConfig } from '../../config';

@Directive({
  // tslint:disable
  selector: '[cxFormComponent]',
})
export class MockDynamicFieldDirective {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
}

const mockFormGroup = {
  config: {
    formGroups: [],
  },
};

export class MockDynamicFormsConfig {}

export class MockFormBuilderService {
  createForm() {
    return mockFormGroup;
  }
}

const formData: YFormData = {};

export class MockFormDataService {
  getSubmittedForm() {
    return new BehaviorSubject(formData);
  }
}

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockFormBuilderService: MockFormBuilderService;
  let mockFormDataService: MockFormDataService;
  let mockDynamicFormsConfig: MockDynamicFormsConfig;

  beforeEach(async(() => {
    mockFormBuilderService = new MockFormBuilderService();
    mockFormDataService = new MockFormDataService();
    mockDynamicFormsConfig = new MockDynamicFormsConfig();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [
        {
          provide: FormBuilderService,
          useValue: mockFormBuilderService,
        },
        {
          provide: FormDataService,
          useValue: mockFormDataService,
        },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
