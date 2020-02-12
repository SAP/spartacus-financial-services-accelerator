import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { ComparisonPanelCMSComponent } from '../../../occ/occ-models';
import { FormDataService } from '@fsa/dynamicforms';
import { PricingService } from '../../../core/checkout/services/pricing/pricing.service';
import { PricingData } from '../../../occ/occ-models';
import { BillingTimeConnector } from '../../../core/checkout/services/billing-time/connectors/billing-time.connector';

@Component({
  selector: 'fsa-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData: Observable<any>;
  pricingData: PricingData = {};

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeConnector: BillingTimeConnector,
    protected formDataService: FormDataService,
    protected pricingService: PricingService
  ) {}

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
    this.componentData.data$.pipe(take(1)).subscribe(data => {
      const productCodes = data.products.split(' ');
      this.billingData = this.billingTimeConnector.getBillingTimes(
        productCodes
      );
    });

    this.subscription.add(
      this.formDataService
        .getCurrentFormData()
        .pipe(
          map(currentForm => currentForm.id),
          switchMap(formDataId => this.formDataService.getFormData(formDataId))
        )
        .subscribe(formData => {
          if (formData.content) {
            this.pricingData = this.pricingService.buildPricingData(
              JSON.parse(formData.content)
            );
          }
        })
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
