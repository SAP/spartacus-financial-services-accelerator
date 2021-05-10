import { Injectable } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { EChartsOption } from 'echarts';
import { tap } from 'rxjs/operators';

@Injectable()
export class PolicyChartDataService {
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

  calculatePremiumAmountByCategory(
    policies,
    chartOption: EChartsOption,
    language: string
  ) {
    chartOption.series[0].data = [];
    Object.keys(policies).forEach(category => {
      const policyAmountByCategory = policies[category].reduce(
        (sum, policy) => sum + policy.policyPremium.value,
        0
      );
      if (policyAmountByCategory) {
        chartOption.series[0].data.push({
          value: policyAmountByCategory,
          name: category.split(' ')[0],
          currencyValue: policyAmountByCategory.toLocaleString(language, {
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
    const properties = Array.isArray(path) ? path : path.split('.');
    return properties.reduce(
      (previous, current) => previous && previous[current],
      object
    );
  }
}
