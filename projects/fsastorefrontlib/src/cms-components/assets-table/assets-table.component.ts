import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getDataByAssetType,
  getRouteByAssetType,
} from '../../core/assets-table-config/assets-table.config';
import { ClaimService } from '../../core/my-account/facade/claim.service';
import { AssetTableType } from '../../occ/occ-models/occ.models';

/**
 * The Assets Table component currently provides a limited generic table DOM structure. It accepts 4 strings used as headings
 * and one object which can contain either Quotes, Policies or Claims. Based on what asset the user has chosen on user-profile component,
 * that asset is being passed to this component and is displayed accordingly in the table.
 *
 * TO-DO: Create more generic approach with some sort of configuration
 */

@Component({
  selector: 'cx-fs-assets-table',
  templateUrl: './assets-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsTableComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  constructor(
    protected routingService: RoutingService,
    protected fileUploadService: FileService,
    protected claimService: ClaimService
  ) {}

  @Input() assets: { [key: string]: any }[];
  @Input() assetSelected: string;
  @Input() isSeller: boolean;
  @Input() selectedAsset: AssetTableType;
  @Input() customerId: string;

  assetTableTypeRef = AssetTableType;

  defaultHeadings: string[] = [
    'fscommon.application.number',
    'dashboard.name',
    'fscommon.paymentFrequency',
    'fscommon.status',
  ];

  dataByAssetType: { [key in AssetTableType]: any };
  routeByAssetType: { [key in AssetTableType]: any };

  ngOnInit(): void {
    this.dataByAssetType = getDataByAssetType(this.defaultHeadings);
  }

  startClaim(e, asset, assetConfig) {
    e.stopPropagation();
    if (!assetConfig.startClaim) return;

    if (
      asset.categoryData.code === 'insurances_auto' &&
      asset.policyNumber &&
      asset.contractNumber
    ) {
      this.fileUploadService.resetFiles();
      this.claimService.createClaim(asset.policyNumber, asset.contractNumber);

      this.subscription.add(
        this.claimService
          .getCurrentClaim()
          .pipe(
            map(claim => {
              if (claim && claim.configurationSteps) {
                this.routingService.go({
                  cxRoute: claim.configurationSteps[0].pageLabelOrId,
                });
              }
            })
          )
          .subscribe()
      );
    }
  }

  resolveAssetUrl(asset: { [key: string]: any }) {
    this.routeByAssetType = getRouteByAssetType(asset);

    if (asset && !this.isSeller) {
      const { cxRoute, params } = this.routeByAssetType[this.selectedAsset];
      this.routingService.go({ cxRoute, params });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
