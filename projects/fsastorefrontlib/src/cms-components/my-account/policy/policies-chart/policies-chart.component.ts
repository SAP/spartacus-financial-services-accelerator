import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { combineLatest, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { ChartConfig } from '../../../../core/chart-config/chart-options.config';
import { Config, LanguageService } from '@spartacus/core';

@Component({
  selector: 'cx-fs-policies-chart',
  templateUrl: './policies-chart.component.html',
  providers: [
    PolicyChartDataService,
    { provide: ChartConfig, useExisting: Config },
  ],
})
export class PoliciesChartComponent implements OnInit, OnDestroy {
  chartOption: EChartsOption;
  options: any[];
  selectedFrequency: string;
  policiesByPaymentFrequency;
  language: string;
  private subscription = new Subscription();

  constructor(
    protected policyService: PolicyService,
    protected policyChartDataService: PolicyChartDataService,
    protected languageService: LanguageService,
    protected chartConfig: ChartConfig
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.languageService.getActive(),
        this.policyService.getPolicies(),
      ])
        .pipe(
          filter(([lang, policies]) => !!policies.insurancePolicies),
          take(1),
          tap(([lang, policies]) => {
            this.language = lang;
            this.policiesByPaymentFrequency = this.policyChartDataService.groupPoliciesByAttribute(
              policies.insurancePolicies,
              'paymentFrequency'
            );
            this.chartOption = this.chartConfig.chartOption;
            this.setPaymentFrequencyDropdown();
            this.setChartSeriesData();
          })
        )
        .subscribe()
    );
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
      this.chartOption,
      this.language
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
