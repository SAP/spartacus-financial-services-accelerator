import { Observable, of } from 'rxjs';
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  Consent,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  Translatable,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ConsentService } from '../../../core/my-account/facade/consent.service';
import { FSConsentManagementComponent } from './consent-management.component';

const userId = OCC_USER_ID_CURRENT;
const code = '000001';
const date1 = 'date1';
const consentHolderName = 'chName';
const consentHolderUid = 'chUid';
const consentTemplateId = 'ctId';
const consentTemplateDesc = 'ctDesc';
const consentTemplateVersion = 'ctVersion';
const customerName = 'customerName';
const customerUid = 'customerUid';

const mockedConsents = {
  consents: [
    {
      code: code,
      consentGivenDate: date1,
      consentHolders: [
        {
          name: consentHolderName,
          uid: consentHolderUid,
        },
      ],
      consentTemplate: {
        id: consentTemplateId,
        description: consentTemplateDesc,
        version: consentTemplateVersion,
      },
      customer: {
        name: customerName,
        uid: customerUid,
      },
      oboConsentConfiguration: {
        permissions: [
          {
            key: 'fnol',
            value: true,
          },
          {
            key: 'checkout',
            value: true,
          },
          {
            key: 'documents',
            value: true,
          },
        ],
      },
    },
  ],
};

const mockedConsentTemplates = {
  consentTemplates: [
    {
      id: consentTemplateId,
      description: consentTemplateDesc,
      version: consentTemplateVersion,
    },
  ],
};

class MockConsentService {
  loadConsents() {}

  getConsents() {
    return of(mockedConsents);
  }

  getConsentsLoaded() {
    return of(true);
  }
}

class MockUserConsentService {
  loadConsents(): void {}
  getConsentsResultLoading(): Observable<boolean> {
    return of();
  }
  getGiveConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getGiveConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return of();
  }
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return of();
  }
  getConsents(): Observable<ConsentTemplate[]> {
    return of();
  }
  giveConsent(
    _consentTemplateId: string,
    _consentTemplateVersion: number
  ): void {}
  resetGiveConsentProcessState(): void {}
  withdrawConsent(_consentCode: string): void {}
  resetWithdrawConsentProcessState(): void {}
  filterConsentTemplates(
    _templateList: ConsentTemplate[],
    _hideTemplateIds: string[] = []
  ): ConsentTemplate[] {
    return [];
  }
  isConsentGiven(_consent: Consent): boolean {
    return false;
  }
  isConsentWithdrawn(_consent: Consent): boolean {
    return false;
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class GlobalMessageServiceMock {
  add(_text: string | Translatable, _type: GlobalMessageType): void {}
}

class AnonymousConsentsServiceMock {
  getTemplates(): Observable<ConsentTemplate[]> {
    return of([]);
  }
}

class AuthServiceMock {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

describe('FSConsentManagementComponent', () => {
  let component: FSConsentManagementComponent;
  let fixture: ComponentFixture<FSConsentManagementComponent>;
  let fsConsentService: ConsentService;
  let userConsentService: UserConsentService;
  let userIdService: UserIdService;
  let globalMessageService: GlobalMessageService;
  let anonymousConsentsConfig: AnonymousConsentsConfig;
  let anonymousConsentsService: AnonymousConsentsService;

  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      const mockAnonymousConsentsConfig = {
        anonymousConsents: {},
      };
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, StoreModule.forRoot({})],
        providers: [
          { provide: UserConsentService, useClass: MockUserConsentService },
          { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
          {
            provide: AnonymousConsentsConfig,
            useValue: mockAnonymousConsentsConfig,
          },
          {
            provide: AnonymousConsentsService,
            useClass: AnonymousConsentsServiceMock,
          },
          { provide: AuthService, useClass: AuthServiceMock },
          { provide: ConsentService, useClass: MockConsentService },
          { provide: UserIdService, useClass: MockUserIdService },
        ],
        declarations: [FSConsentManagementComponent],
      }).compileComponents();

      fsConsentService = TestBed.inject(ConsentService);
      userConsentService = TestBed.inject(UserConsentService);
      userIdService = TestBed.inject(UserIdService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      anonymousConsentsConfig = TestBed.inject(AnonymousConsentsConfig);
      anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSConsentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
