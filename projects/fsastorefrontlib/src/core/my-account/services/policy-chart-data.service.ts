import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';

@Injectable()
export class PolicyChartDataService {
  protected readonly SEPARATOR = '.';

  groupPoliciesByAttribute(policies: any[], key: string | string[]) {
    return policies.reduce((policy, item) => {
      const groupCriteria = this.getObjectValueByProperty(key, item);
      policy[groupCriteria] = policy[groupCriteria] || [];
      policy[groupCriteria].push({
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

  getObjectValueByProperty(path: string | string[], object) {
    const properties = Array.isArray(path) ? path : path.split(this.SEPARATOR);
    return properties.reduce(
      (previous, current) => previous && previous[current],
      object
    );
  }
}
