import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
  billingData: [
    {
      paymentStatus: 'Overdue',
      dueDate: new Date().toString(),
    },
  ],
};
const policies = {
  insurancePolicies: [policy1],
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
        declarations: [PremiumCalendarComponent],
        providers: [
          {
            provide: PolicyService,
            useClass: MockPolicyService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    policyService = TestBed.inject(PolicyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close policy accordion', () => {
    component.toggleActiveAccordion(3);
    expect(component.selectedIndexes.length).toEqual(1);
    component.toggleActiveAccordion(3);
    expect(component.selectedIndexes.length).toEqual(0);
  });
});
