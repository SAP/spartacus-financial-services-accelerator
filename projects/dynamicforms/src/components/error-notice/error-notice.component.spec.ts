import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { ErrorNoticeComponent } from './error-notice.component';
import { of } from 'rxjs';
import { FieldConfig } from '../../core/models';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const fieldType = 'input';
const defaultErrorMessage = 'Test string';
const enErrorMessage = 'En test string';

const defaultFieldConfig: FieldConfig = {
  fieldType: fieldType,
  error: {
    default: defaultErrorMessage,
  },
};

const localizedFieldConfig: FieldConfig = {
  fieldType: fieldType,
  error: {
    default: 'defaultLabel',
    en: enErrorMessage,
  },
};

describe('ErrorNoticeComponent', () => {
  let component: ErrorNoticeComponent;
  let fixture: ComponentFixture<ErrorNoticeComponent>;
  let el: DebugElement;
  let mockLanguageService: MockLanguageService;

  beforeEach(
    waitForAsync(() => {
      mockLanguageService = new MockLanguageService();

      TestBed.configureTestingModule({
        declarations: [ErrorNoticeComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          {
            provide: LanguageService,
            useValue: mockLanguageService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNoticeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default errorMessage', () => {
    component.parentConfig = defaultFieldConfig;
    component.ngOnInit();
    expect(component.errorMessage).toEqual(defaultErrorMessage);
  });

  it('should set english error message', () => {
    component.parentConfig = localizedFieldConfig;
    component.ngOnInit();
    expect(component.errorMessage).toEqual(enErrorMessage);
  });

  it('should render error component', () => {
    const errorComponent = el.query(By.css('.px-2')).nativeElement;
    expect(errorComponent).toBeTruthy();
  });
});
