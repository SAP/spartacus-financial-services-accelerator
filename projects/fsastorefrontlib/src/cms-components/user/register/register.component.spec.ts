import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthRedirectService,
  AuthService,
  ConsentTemplate,
  FeatureConfigService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  Title,
  UserService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSRegisterComponent } from './register.component';
import createSpy = jasmine.createSpy;
import { DateConfig } from './../../../core/date-config/date-config';
import { UserProfileCoreModule } from '@spartacus/user/profile/core';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
const isLevelBool: BehaviorSubject<boolean> = new BehaviorSubject(false);
const registerUserIsSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);
const registerUserIsLoading: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);

const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};
const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  dateOfBirth: '17/09/1990',
  phoneNumber: '333333333',
  email_lowercase: 'johndoe@thebest.john.intheworld.com',
  termsandconditions: true,
  password: 'strongPass$!123',
};
const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: ['MARKETING'],
  },
};
const mockTitlesList: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];

class MockUserService {
  loadTitles(): void {}
  getTitles(): Observable<Title[]> {
    return of([]);
  }
  resetRegisterUserProcessState(): void {}
  getRegisterUserResultLoading(): Observable<boolean> {
    return registerUserIsLoading.asObservable();
  }
  getRegisterUserResultSuccess(): Observable<boolean> {
    return registerUserIsSuccess.asObservable();
  }
}
class MockGlobalMessageService {
  remove() {}
  get() {
    return of();
  }
}
class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}
class MockAuthRedirectService {
  redirect = createSpy('AuthRedirectService.redirect');
}
class MockRoutingService {
  go = createSpy();
}
class MockFeatureConfigService {
  isLevel(_level: string): boolean {
    return isLevelBool.value;
  }
  isEnabled(_feature: string): boolean {
    return true;
  }
}
class MockAnonymousConsentsService {
  getConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }
  getTemplate(_templateCode: string): Observable<ConsentTemplate> {
    return of();
  }
  withdrawConsent(_templateCode: string): void {}
  giveConsent(_templateCode: string): void {}
  isConsentGiven(_consent: AnonymousConsent): boolean {
    return true;
  }
}

class MockRegisterComponentService
  implements Partial<RegisterComponentService>
{
  getTitles = createSpy().and.returnValue(of(mockTitlesList));
  register = createSpy().and.returnValue(of(undefined));
  postRegisterMessage = createSpy();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles() {
    return of(mockTitlesList);
  }
}
describe('FSRegisterComponent', () => {
  let component: FSRegisterComponent;
  let fixture: ComponentFixture<FSRegisterComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          UserProfileCoreModule,
        ],
        declarations: [FSRegisterComponent, MockUrlPipe],
        providers: [
          {
            provide: UserRegisterFacade,
            useClass: MockUserRegisterFacade,
          },
          {
            provide: AuthRedirectService,
            useClass: MockAuthRedirectService,
          },
          { provide: UserService, useClass: MockUserService },
          { provide: AuthService, useClass: MockAuthService },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FeatureConfigService,
            useClass: MockFeatureConfigService,
          },
          {
            provide: AnonymousConsentsService,
            useClass: MockAnonymousConsentsService,
          },
          {
            provide: AnonymousConsentsConfig,
            useValue: mockAnonymousConsentsConfig,
          },
          {
            provide: DateConfig,
            useValue: MockDateConfig,
          },
          {
            provide: RegisterComponentService,
            useClass: MockRegisterComponentService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(FSRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('collectDataFromRegisterForm()', () => {
    it('should return correct register data', () => {
      const form = mockRegisterFormData;

      expect(component.collectDataFromRegisterForm(form)).toEqual({
        firstName: form.firstName,
        lastName: form.lastName,
        uid: form.email_lowercase,
        password: form.password,
        titleCode: form.titleCode,
        dateOfBirth: form.dateOfBirth,
        phoneNumber: form.phoneNumber,
      });
    });
  });
});
