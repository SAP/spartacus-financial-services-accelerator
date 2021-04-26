import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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
          tap(policies => {
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
        text: 'Purchase Order',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: '#000033',
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
        position: 'inside',
        formatter: params => {
          let res = '';
          res +=
            params.data['name'] +
            ': ' +
            params.data['currancyValue'] +
            ' (' +
            params.percent +
            '%)';
          return res;
        },
      },
      legend: {
        top: 'bottom',
        padding: 10,
      },
      toolbox: {
        show: true,
        padding: [0, 0, 3, 0],
        feature: {
          saveAsImage: {
            show: true,
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
              res += params.data['currancyValue'];
              return res;
            },
          },
          labelLine: {
            show: true,
            length: 8,
            length2: 0,
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
    if (this.isChartVisible) {
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
