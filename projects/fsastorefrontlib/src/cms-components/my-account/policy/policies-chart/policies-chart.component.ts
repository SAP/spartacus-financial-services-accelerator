import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
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
  selectedFrequency: any;
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
        this.policyService.getPolicies(),
        this.languageService.getActive(),
      ])
        .pipe(
          filter(([policies, _]) => !!policies.insurancePolicies),
          tap(([policies, lang]) => {
            if (this.language && this.language !== lang) {
              this.policyService.loadPolicies();
            }
            this.language = lang;
            this.policiesByPaymentFrequency =
              this.policyChartDataService.groupPoliciesByAttribute(
                policies.insurancePolicies,
                'paymentFrequency'
              );
            this.chartOption = { ...this.chartConfig.chartOption };
            this.setPaymentFrequencyDropdown();
            this.setChartSeriesData();
          })
        )
        .subscribe()
    );
  }

  setPaymentFrequencyDropdown() {
    this.options = [];
    Object.keys(this.policiesByPaymentFrequency).forEach((key, index) =>
      this.options.push({ name: key, frequency: key, id: index })
    );
    this.selectedFrequency = !this.selectedFrequency
      ? this.options[0]
      : this.options[this.selectedFrequency.id];
  }

  setChartSeriesData() {
    const policiesByCategory =
      this.policyChartDataService.groupPoliciesByAttribute(
        this.policiesByPaymentFrequency[this.selectedFrequency.frequency],
        'categoryData.name'
      );
    this.policyChartDataService.calculatePremiumAmountByCategory(
      policiesByCategory,
      this.chartOption,
      this.language
    );
  }

  selectPaymentFrequency(selectedItem) {
    this.selectedFrequency = selectedItem;
    this.setChartSeriesData();
    this.chartOption = { ...this.chartOption };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
