import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { Directive, Input } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services';
import { of } from 'rxjs';

@Directive({
  // tslint:disable
  selector: '[cxDynamicField]',
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

export class MockFormService {
  createForm() {
    return mockFormGroup;
  }
}

const formData = {};

export class MockFormDataService {
  getSubmittedData() {
    return of(formData);
  }
}

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockFormService: MockFormService;
  let mockFormDataService: MockFormDataService;

  beforeEach(async(() => {
    mockFormService = new MockFormService();
    mockFormDataService = new MockFormDataService();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent, MockDynamicFieldDirective],
      providers: [
        {
          provide: FormBuilderService,
          useValue: mockFormService,
        },
        {
          provide: FormDataService,
          useValue: mockFormDataService,
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
