import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OccFormService } from '../../occ/services/occ-form.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FieldConfig } from '../../core/models/form-config.interface';
import { TitleComponent } from './title.component';
import { LanguageService } from '@spartacus/core';
import { of } from 'rxjs';

class MockOccFormService {}

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

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccFormService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
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
    expect(component.config.fieldType).toEqual('title');
  });

  it('should render title component', () => {
    const heading = el.query(By.css('h4')).nativeElement;
    expect(heading).toBeTruthy();
  });
});
