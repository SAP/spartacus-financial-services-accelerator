import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, OccConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { PolicyService } from '../../../core/my-account/facade';
import { PremiumCalendarComponent } from './premium-calendar.component';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

const policy1 = {
  policyId: 'policyId',
  opened: false,
};

const policies = {
    insurancePolicies: [policy1]
}

class MockPolicyService {
  loadPremiumCalendar = createSpy();
  getPremiumCalendarLoaded = createSpy();

  getPremiumCalendar(){
      return of(policies);
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
describe('PremiumCalendarComponent', () => {
  let component: PremiumCalendarComponent;
  let fixture: ComponentFixture<PremiumCalendarComponent>;
  let policyService: PolicyService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    policyService = TestBed.inject(PolicyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get base url', () => {
    expect(component.getBaseUrl()).toEqual('');
  });

  it('should open or close policy', () => {
    component.openPolicy(policy1);
    expect(policy1.opened).toEqual(true);
  });
});
