import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoutingService } from '@spartacus/core';

/**
 * The Assets Table component currently provides a limited generic table DOM structure. It accepts 4 strings used as headings
 * and one object which can contain either Quotes, Policies or Claims. Based on what asset the user has chosen on user-profile component,
 * that asset is being passed to this component and is displayed accordingly in the table.
 *
 * TO-DO: Create more generic approach with some sort of configuration
 */

export enum AssetTableType {
  CLAIM = 'claims',
  POLICY = 'policies',
  QUOTE = 'quotes',
}

@Component({
  selector: 'cx-fs-assets-table',
  templateUrl: './assets-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsTableComponent {
  constructor(protected routingService: RoutingService) {}

  @Input() assets: { [key: string]: any }[];
  @Input() isSeller: boolean;
  @Input() selectedAsset: AssetTableType;

  defaultHeadings: string[] = [
    'fscommon.application.number',
    'dashboard.name',
    'fscommon.paymentFrequency',
    'fscommon.status',
  ];

  dataByAssetType: { [key in AssetTableType]: any } = {
    claims: {
      headings: this.defaultHeadings,
      values: [
        { propName: true, value: 'claimNumber' },
        { propName: true, value: 'insurancePolicy.categoryData.name' },
        { propName: true, value: 'insurancePolicy.paymentFrequency' },
        { propName: true, value: 'claimStatus' },
      ],
    },
    policies: {
      headings: [...this.defaultHeadings, 'Claim'],
      values: [
        { propName: true, value: 'contractNumber' },
        { propName: true, value: 'categoryData.name' },
        { propName: true, value: 'paymentFrequency' },
        { propName: true, value: 'policyStatus' },
        { propName: false, value: 'CREATE' },
      ],
    },
    quotes: {
      headings: this.defaultHeadings,
      values: [
        { propName: true, value: 'quoteId' },
        { propName: true, value: 'defaultCategory.name' },
        { propName: true, value: 'paymentFrequency' },
        { propName: true, value: 'quoteStatus' },
      ],
    },
  };

  resolveAssetUrl(asset: { [key: string]: any }) {
    const routeByAssetType: { [key in AssetTableType]: any } = {
      claims: {
        cxRoute: 'claimDetails',
        params: { claimId: asset.claimNumber },
      },
      policies: {
        cxRoute: 'policyDetails',
        params: {
          policyId: asset.policyNumber,
          contractId: asset.contractNumber,
        },
      },
      quotes: {
        cxRoute: 'quoteDetails',
        params: { quoteId: asset.quoteId },
      },
    };

    if (asset && !this.isSeller) {
      const { cxRoute, params } = routeByAssetType[this.selectedAsset];
      this.routingService.go({ cxRoute, params });
    }
  }
}
