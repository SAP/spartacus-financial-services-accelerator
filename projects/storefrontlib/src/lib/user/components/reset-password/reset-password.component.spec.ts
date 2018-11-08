import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let form: DebugElement;
  let submit: DebugElement;
  let userId: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ResetPasswordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));
    submit = fixture.debugElement.query(By.css('[type="submit"]'));

    component.ngOnInit();
    userId = component.form.controls['userId'];
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid on init', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should form be valid when proper email is set', () => {
    userId.setValue('test@test.com');
    expect(component.form.valid).toBeTruthy();
  });

  it('should requestPasswordReset() to be defined', () => {
    expect(component.requestPasswordReset).toBeDefined();
  });

  it('should call requestPasswordReset() method on submit', () => {
    const request = spyOn(component, 'requestPasswordReset');
    userId.setValue('test@test.com');
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should submit button be disabled when form is invalid', () => {
    userId.setValue('test');
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(submit.nativeElement.disabled).toBeTruthy();
  });

  it('should error message appear when email is invalid', () => {
    fixture.detectChanges();
    const input = component.form.controls['userId'];
    input.setValue('');
    input.markAsTouched();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const message = fixture.debugElement.nativeElement.querySelector(
        '.invalid-feedback'
      );
      expect(component.form.valid).toBeFalsy();
      expect(message).toBeTruthy();
    });
  });
});
