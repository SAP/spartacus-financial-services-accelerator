import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssetTableType } from '../../occ';

@Component({
  selector: 'cx-fs-customer-dashboard',
  templateUrl: 'customer-dashboard.component.html',
})
export class CustomerDashboardComponent {
  @Input() customerAssets: any;
  @Input() seller: boolean;
  @Input() assetSelected: AssetTableType;
  @Output() assetListSelected = new EventEmitter<{
    assetsChosen: Record<string, any>[];
    activeClass: AssetTableType;
  }>();
  @Output() productsOverviewSelected = new EventEmitter<void>();

  showAssetList(
    assetsChosen: Record<string, any>[],
    activeClass: AssetTableType
  ) {
    this.assetListSelected.emit({ assetsChosen, activeClass });
  }
}
