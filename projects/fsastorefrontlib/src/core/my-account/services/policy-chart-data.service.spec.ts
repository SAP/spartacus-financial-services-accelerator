import { TestBed } from '@angular/core/testing';
import { PolicyChartDataService } from '../../my-account/services/policy-chart-data.service';
import { EChartsOption } from 'echarts';

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

const mockChartOption: EChartsOption = {
  series: [
    {
      data: [],
    },
  ],
};

const mockNestedObject = {
  categoryData: {
    code: {
      value: 'Test value',
    },
  },
  paymentFrequency: 'Test1 frequency',
};

describe('PolicyChartDataService', () => {
  let service: PolicyChartDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolicyChartDataService],
    });
    service = TestBed.inject(PolicyChartDataService);
  });

  it('should group policies by given criteria', () => {
    const result = service.groupPoliciesByAttribute(
      mockPolicies,
      'paymentFrequency'
    );
    expect(result).toEqual(mockPoliciesByPaymentFrequency);
  });

  it('should calculate premium amount by policy category', () => {
    const groupByCategory = service.groupPoliciesByAttribute(
      mockPolicies,
      'categoryData.name'
    );
    service.calculatePremiumAmountByCategory(
      groupByCategory,
      mockChartOption,
      'en'
    );
    expect(mockChartOption.series[0].data.length).toEqual(2);
  });

  it('should get nested object property value', () => {
    let result = service.getObjectValueByProperty(
      'categoryData.code.value',
      mockNestedObject
    );
    expect(result).toEqual('Test value');
    result = service.getObjectValueByProperty(
      ['categoryData', 'code', 'value'],
      mockNestedObject
    );
    expect(result).toEqual('Test value');
    result = service.getObjectValueByProperty(
      'paymentFrequency',
      mockNestedObject
    );
    expect(result).toEqual('Test1 frequency');
  });
});
