import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ComparisonPanelCMSComponent } from '../../../occ/occ-models';
import { OccBillingTimeService } from '../../../occ/services/billing-time/billing-time.service';
import { FormDataService } from '@fsa/dynamicforms';
import { PricingService } from '../../../core/checkout/services/pricing/pricing.service';
import { PricingData } from '../../../occ/occ-models';

@Component({
  selector: 'fsa-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent implements OnInit {
  private subscription = new Subscription();
  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData: Observable<any>;
  pricingData: PricingData = {};

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeService: OccBillingTimeService,
    protected formDataService: FormDataService,
    protected pricingService: PricingService
  ) {}

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
    this.componentData.data$.pipe(take(1)).subscribe(data => {
      const productCodes = data.products.split(' ');
      this.billingData = this.billingTimeService.getBillingTimes(productCodes);
    });

    this.subscription.add(
      this.formDataService
        .getCurrentFormData()
        .pipe(
          map(currentForm => {
            if (currentForm.id) {
              this.formDataService
                .getFormData(currentForm.id)
                .subscribe(formData => {
                  if (formData.content) {
                    this.pricingData = this.pricingService.buildPricingData(
                      JSON.parse(formData.content)
                    );
                  }
                });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getProductList(): string[] {
    this.componentData.data$.subscribe(data => {
      this.productList = data.products.split(' ');
    });
    return this.productList;
  }
}
