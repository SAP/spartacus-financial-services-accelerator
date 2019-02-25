import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CmsComponentData} from '@spartacus/storefront';
import {ComparisonPanelCMSComponent} from '../../../occ-models';
import {Observable} from 'rxjs';

@Component({
  selector: 'fsa-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelComponent implements OnInit {

  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
  ) {
  }

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
  }

  getProductList(): string[] {
    this.componentData.data$.subscribe(data => {
      this.productList = data.products.split(' ');
    })
    return this.productList;
  }
}
