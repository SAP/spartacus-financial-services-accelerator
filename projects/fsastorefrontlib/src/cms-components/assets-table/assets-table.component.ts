import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getDataByAssetType,
  getRouteByAssetType,
} from '../../core/assets-table-config/assets-table.config';
import { FS_ICON_TYPE } from '../../core/icon-config/icon-config';
import { ClaimService } from '../../core/my-account/facade/claim.service';
import {
  AssetTableType,
  DataByAssetType,
} from '../../occ/occ-models/occ.models';

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
export class AssetsTableComponent implements OnInit, OnChanges, OnDestroy {
  private subscription = new Subscription();

  constructor(
    protected routingService: RoutingService,
    protected fileUploadService: FileService,
    protected claimService: ClaimService
  ) {}

  @Input() assets: { [key: string]: any }[];
  @Input() selectedAsset: AssetTableType;

  assetTableTypeRef = AssetTableType;
  iconTypes = FS_ICON_TYPE;

  dataByAssetType: DataByAssetType;
  routeByAssetType: { [key in AssetTableType]: any };
  noAssetsCase: string;

  ngOnChanges({
    selectedAsset: { currentValue },
  }: {
    selectedAsset: SimpleChange;
  }): void {
    this.dataByAssetType = getDataByAssetType(currentValue);
  }

  ngOnInit(): void {
    const { QUOTES, POLICIES, CLAIMS } = this.assetTableTypeRef;

    const noAssetsHelperMap = {
      [QUOTES]: 'dashboard.noQuotesOrApplication',
      [POLICIES]: 'dashboard.noPolicies',
      [CLAIMS]: 'dashboard.noClaims',
    };

    this.noAssetsCase = noAssetsHelperMap[this.selectedAsset];
  }

  startClaim({ policyNumber, contractNumber, categoryData: { code } }) {
    const assetIsAuto = code === 'insurances_auto';
    const assetValid = policyNumber && contractNumber;

    if (assetIsAuto && assetValid) {
      this.fileUploadService.resetFiles();
      this.claimService.createClaim(policyNumber, contractNumber);

      this.subscription.add(
        this.claimService
          .getCurrentClaim()
          .pipe(
            map(claim => {
              if (claim?.configurationSteps) {
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

  resolveAssetUrl(asset: any) {
    this.routeByAssetType = getRouteByAssetType(asset);
    const { cxRoute, params } = this.routeByAssetType[this.selectedAsset];
    this.routingService.go({ cxRoute, params });
  }

  resolveIconAction({ asset, assetConfig }) {
    if (assetConfig.startClaim) this.startClaim(asset);
    else this.resolveAssetUrl(asset);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
