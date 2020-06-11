import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  UserToken,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FSRegisterComponent } from './register.component';
import createSpy = jasmine.createSpy;
const isLevelBool: BehaviorSubject<boolean> = new BehaviorSubject(false);
const registerUserIsSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);

class MockUserService {
  loadTitles(): void {}
  getTitles(): Observable<Title[]> {
    return of([]);
  }
  getRegisterUserResultSuccess(): Observable<boolean> {
    return registerUserIsSuccess.asObservable();
  }
  getRegisterUserResultLoading() {}
}
class MockGlobalMessageService {
  remove() {}
  get() {
    return of();
  }
}
class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
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
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: ['MARKETING'],
  },
};
describe('FSRegisterComponent', () => {
  let component: FSRegisterComponent;
  let fixture: ComponentFixture<FSRegisterComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [FSRegisterComponent, MockUrlPipe],
      providers: [
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
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FSRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
