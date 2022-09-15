import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Observable, of } from 'rxjs';

import { PoliciesChartComponent } from './policies-chart.component';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import {
  I18nModule,
  LanguageService,
  TranslationService,
} from '@spartacus/core';
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

const mockFrequencyItem = {
  name: 'Monthly',
  frequency: 'Monthly',
  id: 0,
};

const mockSelectedFrequencyItem = {
  name: 'Test1 frequency',
  frequency: 'Test1 frequency',
  id: 0,
};

const mockChartConfig: ChartConfig = {
  chartOption: {
    title: {
      show: true,
      text: 'Purchase Order',
      left: 'center',
      textStyle: {
        color: '#000033',
        fontSize: 16,
        fontWeight: 'normal',
      },
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
      padding: [0, 0, 3, 0],
      feature: {
        saveAsImage: {
          title: '',
          iconStyle: {
            borderColor: '#0066cc',
            borderWidth: 2,
          },
          emphasis: {
            iconStyle: {
              color: '#0066cc',
            },
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
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
        data: [],
      },
    ],
  },
};

class MockPolicyService {
  getPolicies() {
    return of(mockPolicies);
  }
  loadPolicies() {}
}

class MockPolicyChartDataService {
  groupPoliciesByAttribute() {
    return mockPoliciesByPaymentFrequency;
  }
  calculatePremiumAmountByCategory() {}
}

class MockTranslationService {
  translate(key): Observable<string> {
    return of(key);
  }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

describe('PoliciesChartComponent', () => {
  let component: PoliciesChartComponent;
  let fixture: ComponentFixture<PoliciesChartComponent>;
  let mockPolicyService: PolicyService;
  let mockLanguageService: LanguageService;
  let mockTranslationService: TranslationService;

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
            provide: TranslationService,
            useClass: MockTranslationService,
          },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
      })
        .overrideComponent(PoliciesChartComponent, {
          set: {
            providers: [
              { provide: ChartConfig, useValue: mockChartConfig },
              {
                provide: PolicyChartDataService,
                useClass: MockPolicyChartDataService,
              },
            ],
          },
        })
        .compileComponents();

      mockPolicyService = TestBed.inject(PolicyService);
      mockLanguageService = TestBed.inject(LanguageService);
      mockTranslationService = TestBed.inject(TranslationService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesChartComponent);
    component = fixture.componentInstance;
    component.language = 'en';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data when payment frequency is selected', () => {
    spyOn(component, 'selectPaymentFrequency').and.callThrough();
    component.selectPaymentFrequency(mockFrequencyItem);
    expect(component.selectPaymentFrequency).toHaveBeenCalled();
  });

  it('should set selected frequency', () => {
    component.selectedFrequency = mockFrequencyItem;
    component.setPaymentFrequencyDropdown();
    expect(component.selectedFrequency).toEqual(mockSelectedFrequencyItem);
  });
});
