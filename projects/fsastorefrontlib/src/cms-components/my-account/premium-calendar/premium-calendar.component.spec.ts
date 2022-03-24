import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import {
  I18nTestingModule,
  UserIdService,
  OCC_USER_ID_CURRENT,
  OccConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { PolicyService } from '../../../core/my-account/facade';
import { PolicyConnector } from '../../../core/my-account/connectors/policy.connector';
import { PremiumCalendarComponent } from './premium-calendar.component';
import createSpy = jasmine.createSpy;

const policyId = 'PL00001';
const contractId = 'CT00001';
const testCategory = 'testCategory';

const policy1 = {
  policyId: 'policyId',
  opened: false,
};
const policies = {
  insurancePolicies: [policy1],
  billingData: [
    {
      paymentStatus: 'Overdue',
      dueDate: new Date().toString(),
    },
  ],
};

const mockedPolicy = {
  policyId: policyId,
  contractId: contractId,
};

class MockPolicyConnector {
  getPremiumCalendar() {
    return of(mockedPolicy);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const MockOccConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

class MockPolicyService {
  loadPremiumCalendar = createSpy();
  getPremiumCalendarLoaded = createSpy();
  getPremiumCalendar() {
    return of(policies);
  }
}

describe('PremiumCalendarComponent', () => {
  let component: PremiumCalendarComponent;
  let fixture: ComponentFixture<PremiumCalendarComponent>;
  let policyService: PolicyService;
  let userIdService: MockUserIdService;
  let mockPolicyConnector: MockPolicyConnector;

  beforeEach(
    waitForAsync(() => {
      mockPolicyConnector = new MockPolicyConnector();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [PremiumCalendarComponent],
        providers: [
          {
            provide: PolicyService,
            useClass: MockPolicyService,
          },
          {
            provide: OccConfig,
            useValue: MockOccConfig,
          },
          { provide: UserIdService, useClass: MockUserIdService },
          { provide: PolicyConnector, useValue: mockPolicyConnector },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    policyService = TestBed.inject(PolicyService);
    userIdService = TestBed.inject(UserIdService);
    fixture = TestBed.createComponent(PremiumCalendarComponent);
    component = fixture.componentInstance;

    spyOn(mockPolicyConnector, 'getPremiumCalendar').and.callThrough();
    spyOn(userIdService, 'getUserId').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get base url', () => {
    expect(component.baseUrl).toEqual('');
  });

  it('should open and close policy accordion', () => {
    component.toggleActiveAccordion(3);
    expect(component.selectedIndexes.length).toEqual(1);
    component.toggleActiveAccordion(3);
    expect(component.selectedIndexes.length).toEqual(0);
  });
});
