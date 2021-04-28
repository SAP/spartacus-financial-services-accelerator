import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { ChartConfig } from '../../../../core/chart-config/chart-options.config';

@Component({
  selector: 'cx-fs-policies-chart',
  templateUrl: './policies-chart.component.html',
})
export class PoliciesChartComponent implements OnInit, OnDestroy {
  chartOption: EChartsOption;
  options: any[];
  selectedFrequency: string;
  policiesByPaymentFrequency;
  private subscription = new Subscription();

  constructor(
    protected policyService: PolicyService,
    protected policyChartDataService: PolicyChartDataService,
    protected chartConfig: ChartConfig
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.policyService
        .getPolicies()
        .pipe(
          filter((policies: any) => !!policies.insurancePolicies),
          take(1),
          tap((policies: any) => {
            this.policiesByPaymentFrequency = this.policyChartDataService.groupPoliciesByAttribute(
              policies.insurancePolicies,
              'paymentFrequency'
            );
            this.setPaymentFrequencyDropdown();
            this.setChartSeriesData();
          })
        )
        .subscribe()
    );
    this.initChart();
  }

  initChart() {
    this.chartOption = {
      title: {
        show: this.chartConfig.options.title.show,
        text: this.chartConfig.options.title.text,
        left: this.chartConfig.options.title.left,
        textStyle: {
          fontSize: this.chartConfig.options.title.fontSize,
          color: this.chartConfig.options.title.color,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        formatter: this.chartConfig.options.tooltip.formatter,
      },
      legend: {
        top: this.chartConfig.options.legend.top,
      },
      toolbox: {
        show: this.chartConfig.options.toolbox.show,
        padding: [0, 0, 3, 0],
        feature: {
          saveAsImage: {
            title: this.chartConfig.options.toolbox.feature.saveAsImage.title,
            iconStyle: {
              borderColor: this.chartConfig.options.toolbox.feature.saveAsImage
                .borderColor,
              borderWidth: this.chartConfig.options.toolbox.feature.saveAsImage
                .borderWidth,
            },
            emphasis: {
              iconStyle: {
                color: this.chartConfig.options.toolbox.feature.emphasis.color,
              },
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          radius: this.chartConfig.options.series.radius,
          itemStyle: {
            borderRadius: this.chartConfig.options.series.borderRadius,
            borderColor: this.chartConfig.options.series.borderColor,
            borderWidth: this.chartConfig.options.series.borderWidth,
          },
          label: {
            show: this.chartConfig.options.series.label.show,
            formatter: this.chartConfig.options.series.label.formatter,
          },
          labelLine: {
            length: this.chartConfig.options.series.labelLine.length,
            length2: this.chartConfig.options.series.labelLine.length2,
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
      'categoryData.name'
    );
    this.policyChartDataService.calculatePremiumAmountByCategory(
      policiesByCategory,
      this.chartOption
    );
  }

  selectPaymentFrequency() {
    if (!this.selectedFrequency) {
      return;
    }
    this.setChartSeriesData();
    this.chartOption = { ...this.chartOption };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
