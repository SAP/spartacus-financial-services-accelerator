import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Observable, of } from 'rxjs';

import { PoliciesChartComponent } from './policies-chart.component';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { I18nModule, TranslationService } from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChartConfig } from '../../../../core/chart-config/chart-options.config';

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

const mockPolicies = {
  insurancePolicies: [policy1, policy2],
};

const mockPoliciesByPaymentFrequency = {
  'Test1 frequency': [policy1],
  'Test2 frequency': [policy2],
};

const mockChartConfig: ChartConfig = {
  options: {
    title: {
      show: true,
      text: 'Purchase Order',
      left: 'center',
      color: '#000033',
      fontSize: 16,
    },
    tooltip: {
      formatter: params => {
        return `<span class="semi-bold">${params.data['name']}:</span><br/> ${params.data['currencyValue']} (${params.percent}%)`;
      },
    },
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          title: '',
          borderColor: '#0066cc',
          borderWidth: 2,
        },
        emphasis: {
          color: '#0066cc',
        },
      },
    },
    series: {
      radius: ['40%', '70%'],
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2,
      label: {
        show: true,
        formatter: params => {
          return params.data['currencyValue'];
        },
      },
      labelLine: {
        length: 8,
        length2: 0,
      },
    },
  },
};

class MockPolicyService {
  getPolicies() {
    return of(mockPolicies);
  }
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
          {
            provide: ChartConfig,
            useValue: mockChartConfig,
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

  it('should update chart data when payment frequency is selected', () => {
    spyOn(
      mockPolicyChartDataService,
      'calculatePremiumAmountByCategory'
    ).and.callThrough();
    component.selectedFrequency = null;
    fixture.detectChanges();
    const selectEl = el.query(By.css('select')).nativeElement;
    selectEl.dispatchEvent(new Event('change'));
    component.selectedFrequency = selectEl.options[1].value;
    selectEl.dispatchEvent(new Event('change'));
    expect(
      mockPolicyChartDataService.calculatePremiumAmountByCategory
    ).toHaveBeenCalled();
  });
});
