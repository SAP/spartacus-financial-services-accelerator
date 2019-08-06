import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FSUpdateProfileFormComponent } from './fs-update-profile-form.component';
import { FSUser } from 'projects/fsastorefrontlib/src/lib/occ-models';

const mockUser: FSUser = {
  titleCode: 'dr',
  firstName: 'Donna',
  lastName: 'Moore',
  uid: 'donna@moore.com',
  dateOfBirth: '08/12/1990'
};

describe('FSUpdateProfileFormComponent', () => {
  let component: FSUpdateProfileFormComponent;
  let fixture: ComponentFixture<FSUpdateProfileFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [FSUpdateProfileFormComponent],
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

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component.submited, 'emit').and.stub();

      const invalidUser: FSUser = {
        ...mockUser,
        dateOfBirth: '',
      };
      component.user = invalidUser;
      component.ngOnInit();

      component.onSubmit();
      expect(component.submited.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event', () => {
      spyOn(component.submited, 'emit').and.stub();
      component.user = mockUser;
      component.ngOnInit();

      component.onSubmit();
      expect(component.submited.emit).toHaveBeenCalled();
    });
  });

  describe('when the date of birth is invalid', () => {
    const invalidUser: FSUser = {
      ...mockUser,
      dateOfBirth: '11/5/',
    };

    it('submitt button should be disabled', () => {
      component.user = invalidUser;
      component.ngOnInit();
      const submitBtn = el.query(By.css('button[type="submit"]'));
      expect(submitBtn.nativeElement.disabled).toBeTruthy();
    });
  });
});
