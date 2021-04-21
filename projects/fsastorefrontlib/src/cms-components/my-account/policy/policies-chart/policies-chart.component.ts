import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { policy } from 'fsastorefrontlib/assets/translations/de/policy.de';

@Component({
  selector: 'cx-fs-policies-chart',
  templateUrl: './policies-chart.component.html',
})
export class PoliciesChartComponent implements OnInit, OnDestroy {
  policies$;
  policyChartData;
  chartOption: EChartsOption;
  updatedOption: EChartsOption;
  options: any[];
  isChartVisible: boolean;
  selectedFrequency = 'Single';
  premiumSumByPaymentFrequency: number;
  policyCurrency: string;
  private subscription = new Subscription();

  constructor(protected policyService: PolicyService) {}

  ngOnInit(): void {
    this.initChart();
    this.subscription.add(
      this.policyService
        .getPolicies()
        .pipe(
          map(policies => policies.insurancePolicies),
          tap(policies => {
            console.log(policies, 'policies')
            this.policyChartData = this.groupPoliciesByCategory(
              policies,
              'categoryData',
              'name'
            );
            console.log(this.policyChartData, 'policyChartData');
            if (this.policyChartData) {
              this.calculatePremiumAmountByCategoryAndPaymentFrequency(
                this.selectedFrequency
              );
            }
          })
        )
        .subscribe()
    );
    this.options = [
      { name: 'Single', label: 'Single' },
      { name: 'Monthly', label: 'Monthly' },
      { name: 'Quarterly', label: 'Quarterly' },
      { name: 'Half-yearly', label: 'Half-yearly' },
      { name: 'Annually', label: 'Annually' },
    ];
  }

  initChart() {
    this.chartOption = {
      title: {
        show: true,
        text: 'Purchase order overview by policies',
        left: 'center',
        padding: 20,
      },
      tooltip: {
        trigger: 'item',
        position: 'inside',
        formatter: '{b}: {d}%',
      },
      legend: {
        top: 'bottom',
        padding: 15,
        itemGap: 25,
        itemWidth: 40,
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { 
            show: true,
            // title: 'Image',
            iconStyle: {
              // color: '#0066cc'
            },
            emphasis: {
              iconStyle: {
                textPosition: 'left',
                color: '#0066cc'
              }
            }
            // icon: '<i class="fas fa-download"></i>'
          },
        },
      },
      series: [
        {
          name: 'Insurance',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: params => {
              let res = '';
              res += params.name + ': ' + params.value.toLocaleString();
              return res;
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: [],
        },
      ],
    };
  }

  selectPaymentFrequency() {
    if (!this.selectedFrequency) {
      this.isChartVisible = false;
      return;
    }
    this.calculatePremiumAmountByCategoryAndPaymentFrequency(
      this.selectedFrequency
    );
    this.chartOption = { ...this.chartOption };
  }

  toggleChartVisibility() {
    this.isChartVisible = !this.isChartVisible;
    if (!this.isChartVisible) {
      this.selectedFrequency = 'Single';
    }
  }

  calculatePremiumAmountByCategoryAndPaymentFrequency(
    paymentFrequency: string
  ) {
    this.chartOption.series[0].data = [];
    this.premiumSumByPaymentFrequency = 0;
    Object.keys(this.policyChartData).forEach((category, index) => {
      this.policyCurrency = this.policyChartData[category][0].currency;
      const reducer = (sum, policy) => sum + policy.policyPremium;
      const initialValue = 0;
      const policyAmountByCategory = this.policyChartData[category]
        .filter(data => data.paymentFrequency === paymentFrequency)
        .reduce(reducer, initialValue);
      // if policyAmount = 0, there is no filtered policy by paymentFrequency
      // shuldn't push those policies in the chart series
      if (policyAmountByCategory) {
        this.premiumSumByPaymentFrequency += policyAmountByCategory;
        this.chartOption.series[0].data.push({
          value: policyAmountByCategory,
          name: category
        });
      }
    });
  }

  groupPoliciesByCategory(policies: any[], key: string, subkey: string) {
    // returns key: value paires, key is category and value is array of policies by that category
    return policies?.reduce((policy, item) => {
      const group = item[key][subkey];
      policy[group] = policy[group] || [];
      policy[group].push({
        policyPremium: item.policyPremium.value,
        paymentFrequency: item.paymentFrequency,
        currency: item.policyPremium.currencyIso
      });
      return policy;
    }, {});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
