import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ComparisonPanelCMSComponent } from '../../../occ/occ-models';
import { OccBillingTimeService } from '../../../occ/services/billing-time/billing-time.service';

@Component({
  selector: 'fsa-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent implements OnInit {
  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData: Observable<any>;

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeService: OccBillingTimeService
  ) {}

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
    this.componentData.data$.pipe(take(1)).subscribe(data => {
      const productCodes = data.products.split(' ');
      this.billingData = this.billingTimeService.getBillingTimes(productCodes);
    });
  }

  getProductList(): string[] {
    this.componentData.data$.subscribe(data => {
      this.productList = data.products.split(' ');
    });
    return this.productList;
  }
}
