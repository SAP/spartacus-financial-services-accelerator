import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../my-account/facade/policy.service';

@Injectable()
export class PolicyChartDataService {

  constructor(protected policyService: PolicyService) {}

  groupPoliciesByAttribute(policies: any[], key: string, subkey?: string) {
    return policies?.reduce((policy, item) => {
      const group = subkey ? item[key][subkey] : item[key];
      policy[group] = policy[group] || [];
      policy[group].push({
        categoryData: item.categoryData,
        policyPremium: item.policyPremium,
        paymentFrequency: item.paymentFrequency,
      });
      return policy;
    }, {});
  }

  calculatePremiumAmountByCategory(policies, chartOption: EChartsOption) {
    chartOption.series[0].data = [];
    Object.keys(policies).forEach(category => {
      const reducer = (sum, policy) => sum + policy.policyPremium.value;
      const initialValue = 0;
      const policyAmountByCategory = policies[category]
        .reduce(reducer, initialValue);
      if (policyAmountByCategory) {
        chartOption.series[0].data.push({
          value: policyAmountByCategory,
          name: category,
        });
      }
    });
  }
}
