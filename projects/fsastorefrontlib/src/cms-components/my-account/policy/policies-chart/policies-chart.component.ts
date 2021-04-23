import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';

@Component({
  selector: 'cx-fs-policies-chart',
  templateUrl: './policies-chart.component.html',
})
export class PoliciesChartComponent implements OnInit, OnDestroy {
  chartOption: EChartsOption;
  options: any[];
  isChartVisible: boolean;
  selectedFrequency: string;
  policiesByPaymentFrequency;
  private subscription = new Subscription();

  constructor(
    protected policyService: PolicyService,
    protected policyChartDataService: PolicyChartDataService
  ) {}

  ngOnInit(): void {
    this.initChart();
    this.subscription.add(
      this.policyService.policies$
        .pipe(
          take(1),
          tap(policies => {
            console.log(policies, 'policies')
            this.policiesByPaymentFrequency = this.policyChartDataService.groupPoliciesByAttribute(
              policies,
              'paymentFrequency'
            );
            this.setPaymentFrequencyDropdown();
            this.setChartSeriesData();
          })
        )
        .subscribe()
    );
  }

  initChart() {
    this.chartOption = {
      title: {
        show: true,
        text: 'Purchase Order Overview',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        position: 'inside',
        formatter: '{b}: {d}%',
      },
      legend: {
        top: 'bottom',
        padding: 10,
      },
      toolbox: {
        show: true,
        padding: [0, 35, 0, 0],
        feature: {
          saveAsImage: {
            show: true,
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
            formatter: params => {
              let res = '';
              res += params.name + ': ' + params.value.toLocaleString();
              return res;
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
            },
          },
          data: [],
        },
      ],
    };
  }

  setPaymentFrequencyDropdown() {
    this.options = [];
    Object.keys(this.policiesByPaymentFrequency).forEach(key =>
      this.options.push({ name: key, label: key })
    );
    this.selectedFrequency = this.options[0].label;
  }

  setChartSeriesData() {
    const policiesByCategory = this.policyChartDataService.groupPoliciesByAttribute(
      this.policiesByPaymentFrequency[this.selectedFrequency],
      'categoryData',
      'name'
    );
    this.policyChartDataService.calculatePremiumAmountByCategory(
      policiesByCategory,
      this.chartOption
    );
  }

  selectPaymentFrequency() {
    if (!this.selectedFrequency) {
      this.isChartVisible = false;
      return;
    }
    this.setChartSeriesData();
    this.chartOption = { ...this.chartOption };
  }

  toggleChartVisibility() {
    this.isChartVisible = !this.isChartVisible;
    if (!this.isChartVisible) {
      this.selectedFrequency = this.options[0].label;
      this.setChartSeriesData();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
