import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  GlobalMessageService,
  I18nTestingModule,
} from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { BehaviorSubject } from 'rxjs';
import { FSLoginFormComponent } from './login-form.component';
import createSpy = jasmine.createSpy;

const isBusySubject = new BehaviorSubject(false);

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLoginFormComponentService {
  form: UntypedFormGroup = new UntypedFormGroup({
    userId: new UntypedFormControl(),
    password: new UntypedFormControl(),
  });
  isUpdating$ = isBusySubject;
  login = createSpy().and.stub();
}

class MockGlobalMessageService {
  remove = createSpy();
}

describe('FSLoginFormComponent', () => {
  let component: FSLoginFormComponent;
  let fixture: ComponentFixture<FSLoginFormComponent>;
  let loginFormComponentService: LoginFormComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FeaturesConfigModule,
        ],
        declarations: [FSLoginFormComponent, MockUrlPipe],
        providers: [
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          {
            provide: LoginFormComponentService,
            useClass: MockLoginFormComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSLoginFormComponent);
    component = fixture.componentInstance;
    loginFormComponentService = TestBed.inject(LoginFormComponentService);
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form - empty', () => {
    expect(component.form.controls['userId'].value).toBe(null);
    expect(component.form.controls['password'].value).toBe(null);
  });

  describe('login()', () => {
    it('should login and redirect to return url after auth', () => {
      const email = 'test@email.com';
      const password = 'secret';
      component.form.controls['userId'].setValue(email);
      component.form.controls['password'].setValue(password);
      component.onSubmit();
      expect(loginFormComponentService.login).toHaveBeenCalled();
    });
  });
});
