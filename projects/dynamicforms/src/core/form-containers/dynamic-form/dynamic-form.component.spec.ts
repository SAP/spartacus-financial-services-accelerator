import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { Directive, Input } from '@angular/core';
import {
  FieldConfig,
} from '../../models/field-config.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/builder/form-builder.service';

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

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let mockFormService: MockFormService;

  beforeEach(async(() => {
    mockFormService = new MockFormService();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent, MockDynamicFieldDirective],
      providers: [
        {
          provide: FormBuilderService,
          useValue: mockFormService,
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
