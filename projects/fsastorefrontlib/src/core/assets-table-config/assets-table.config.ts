import {
  AssetTableType,
  DataByAssetType,
} from '../../occ/occ-models/occ.models';

export const getDataByAssetType = (
  headings
): { [key in AssetTableType]: DataByAssetType } => ({
  claims: {
    headings,
    values: [
      { propName: true, value: 'claimNumber' },
      { propName: true, value: 'insurancePolicy.categoryData.name' },
      { propName: true, value: 'insurancePolicy.paymentFrequency' },
      { propName: true, value: 'claimStatus' },
    ],
  },
  policies: {
    headings: [...headings, 'claim.claim'],
    values: [
      { propName: true, value: 'contractNumber' },
      { propName: true, value: 'categoryData.name' },
      { propName: true, value: 'paymentFrequency' },
      { propName: true, value: 'policyStatus' },
      {
        propName: false,
        value: 'fscommon.create',
        startClaim: true,
        classes: 'text-uppercase',
      },
    ],
  },
  quotes: {
    headings,
    values: [
      { propName: true, value: 'quoteId' },
      { propName: true, value: 'defaultCategory.name' },
      { propName: true, value: 'paymentFrequency' },
      { propName: true, value: 'quoteStatus' },
    ],
  },
});

export const getRouteByAssetType = (
  asset
): { [key in AssetTableType]: any } => ({
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
});
