import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';

@Injectable()
export class PolicyChartDataService {
  constructor() {}

  groupPoliciesByAttribute(policies: any[], key: string, subkey?: string) {
    return policies.reduce((policy, item) => {
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
      const policyAmountByCategory = policies[category].reduce(
        reducer,
        initialValue
      );
      if (policyAmountByCategory) {
        chartOption.series[0].data.push({
          value: policyAmountByCategory,
          name: category.split(' ')[0],
          currancyValue: policyAmountByCategory.toLocaleString('de-DE', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            style: 'currency',
            currency: policies[category][0].policyPremium.currencyIso,
          }),
        });
      }
    });
  }
}
