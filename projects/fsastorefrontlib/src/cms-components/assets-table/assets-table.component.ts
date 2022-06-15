import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoutingService } from '@spartacus/core';

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
export class AssetsTableComponent {
  constructor(protected routingService: RoutingService) {}

  @Input() headings: string[];
  @Input() assets: { [key: string]: any }[];
  @Input() assetSelected: string;
  @Input() isSeller: boolean;

  resolveAssetUrl(asset: { [key: string]: any }) {
    if (asset && !this.isSeller) {
      const assetRoute = asset.quoteId
        ? 'quoteDetails'
        : asset.policyNumber
        ? 'policyDetails'
        : 'claimDetails';
      const assetParams = asset.quoteId
        ? { quoteId: asset.quoteId }
        : asset.policyNumber
        ? {
            policyId: asset.policyNumber,
            contractId: asset.contractNumber,
          }
        : { claimId: asset.claimNumber };
      this.routingService.go({
        cxRoute: assetRoute,
        params: assetParams,
      });
    }
  }
}
