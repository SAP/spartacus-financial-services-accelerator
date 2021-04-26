import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Observable, of } from 'rxjs';

import { PoliciesChartComponent } from './policies-chart.component';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { I18nModule, TranslationService } from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const policy1 = {
  categoryData: {
    name: 'Test1 insurance',
  },
  paymentFrequency: 'Test1 frequency',
  policyPremium: {
    currencyIso: 'EUR',
    value: '49',
  },
};

const policy2 = {
  categoryData: {
    name: 'Test2 insurance',
  },
  paymentFrequency: 'Test2 frequency',
  policyPremium: {
    currencyIso: 'EUR',
    value: '55',
  },
};

const mockPolicies = [policy1, policy2];

const mockPoliciesByPaymentFrequency = {
  'Test1 frequency': [policy1],
  'Test2 frequency': [policy2],
};

class MockPolicyService {
  policies$ = of(mockPolicies);
}

class MockPolicyChartDataService {
  groupPoliciesByAttribute() {
    return mockPoliciesByPaymentFrequency;
  }
  calculatePremiumAmountByCategory() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of();
  }
}

describe('PoliciesChartComponent', () => {
  let component: PoliciesChartComponent;
  let fixture: ComponentFixture<PoliciesChartComponent>;
  let mockPolicyService: PolicyService;
  let mockPolicyChartDataService: PolicyChartDataService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nModule],
        declarations: [PoliciesChartComponent],
        providers: [
          {
            provide: PolicyService,
            useClass: MockPolicyService,
          },
          {
            provide: PolicyChartDataService,
            useClass: MockPolicyChartDataService,
          },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesChartComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    mockPolicyService = TestBed.inject(PolicyService);
    mockPolicyChartDataService = TestBed.inject(PolicyChartDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toogle chart visibility when show button is clicked', () => {
    spyOn(
      mockPolicyChartDataService,
      'calculatePremiumAmountByCategory'
    ).and.callThrough();
    fixture.detectChanges();
    el.query(By.css('.link')).nativeElement.click();
    component.toggleChartVisibility();
    expect(
      mockPolicyChartDataService.calculatePremiumAmountByCategory
    ).toHaveBeenCalled();
  });

  it('should update chart data when payment frequency is selected', () => {
    component.isChartVisible = true;
    spyOn(
      mockPolicyChartDataService,
      'groupPoliciesByAttribute'
    ).and.callThrough();
    spyOn(
      mockPolicyChartDataService,
      'calculatePremiumAmountByCategory'
    ).and.callThrough();
    fixture.detectChanges();
    const selectEl = el.query(By.css('select')).nativeElement;
    selectEl.dispatchEvent(new Event('change'));
    expect(
      mockPolicyChartDataService.calculatePremiumAmountByCategory
    ).toHaveBeenCalled();
    expect(
      mockPolicyChartDataService.groupPoliciesByAttribute
    ).toHaveBeenCalled();
  });

  it('should not update chart data when payment frequency is not selected', () => {
    component.isChartVisible = true;
    component.selectedFrequency = null;
    fixture.detectChanges();
    const selectEl = el.query(By.css('select')).nativeElement;
    selectEl.dispatchEvent(new Event('change'));
    expect(component.isChartVisible).toBeFalse();
  });
});
