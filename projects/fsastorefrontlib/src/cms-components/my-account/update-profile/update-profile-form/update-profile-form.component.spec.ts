import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FSUser } from '../../../../occ/occ-models';
import { FSUpdateProfileFormComponent } from './update-profile-form.component';
import { DateConfig } from '../../../../core/date-config/date-config';

const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};

const mockUser: FSUser = {
  titleCode: 'dr',
  firstName: 'Donna',
  lastName: 'Moore',
  uid: 'donna@moore.com',
  dateOfBirth: '08/12/1990',
  contactInfos: [{ phoneNumber: '9999999', code: '' }],
};

describe('FSUpdateProfileFormComponent', () => {
  let component: FSUpdateProfileFormComponent;
  let fixture: ComponentFixture<FSUpdateProfileFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [FSUpdateProfileFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useClass: FormBuilder,
        },
        {
          provide: DateConfig,
          useValue: MockDateConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSUpdateProfileFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
    component.user = mockUser;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should NOT emit submitted event if the form is not valid', () => {
      spyOn(component.submitted, 'emit').and.stub();

      const invalidUser: FSUser = {
        ...mockUser,
        dateOfBirth: '',
      };
      component.user = invalidUser;
      component.ngOnInit();

      component.onSubmit();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
  });

  describe('when the date of birth is invalid', () => {
    const invalidUser: FSUser = {
      ...mockUser,
      dateOfBirth: '11/5/',
    };

    it('submit button should be disabled', () => {
      component.user = invalidUser;
      component.ngOnInit();
      const submitBtn = el.query(By.css('button[type="submit"]'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();
    });
  });
});
