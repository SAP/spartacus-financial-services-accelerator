import { Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { FSConsentManagementComponent } from './consent-management.component';
import { DebugElement } from '@angular/core';
import { StoreModule } from '@ngrx/store';

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
  loadConsents() {}

  getConsents() {
    return of(mockedConsentTemplates);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FSConsentManagementComponent', () => {
  let component: FSConsentManagementComponent;
  let fixture: ComponentFixture<FSConsentManagementComponent>;
  let fsConsentService: ConsentService;
  let userConsentService: UserConsentService;
  let userIdService: UserIdService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, StoreModule.forRoot({})],
        providers: [
          { provide: ConsentService, useClass: MockConsentService },
          { provide: UserConsentService, useClass: MockUserConsentService },
          { provide: UserIdService, useClass: MockUserIdService },
        ],
        declarations: [FSConsentManagementComponent],
      }).compileComponents();

      fsConsentService = TestBed.inject(ConsentService);
      userConsentService = TestBed.inject(UserConsentService);
      userIdService = TestBed.inject(UserIdService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSConsentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
