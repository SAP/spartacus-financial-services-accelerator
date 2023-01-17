import {
  AssetTableType,
  DataByAssetType,
} from '../../occ/occ-models/occ.models';

const defaultHeadings: string[] = [
  'fscommon.application.number',
  'dashboard.name',
  'fscommon.paymentFrequency',
  'fscommon.status',
];

export enum AssetColumn {
  EMPTY,
  NUMBER,
  CATEGORY_NAME,
  PAYMENT_FREQUENCY,
  STATUS,
}
const assetTableConfig: { [key in AssetTableType]: DataByAssetType } = {
  claims: {
    headings: defaultHeadings,
    values: [
      {
        column: AssetColumn.NUMBER,
        propName: true,
        value: 'claimNumber',
        classes: 'notice',
      },
      {
        column: AssetColumn.CATEGORY_NAME,
        propName: true,
        value: 'insurancePolicy.categoryData.name',
      },
      {
        column: AssetColumn.PAYMENT_FREQUENCY,
        propName: true,
        value: 'insurancePolicy.paymentFrequency',
      },
      { column: AssetColumn.STATUS, propName: true, value: 'claimStatus' },
    ],
  },
  policies: {
    headings: [...defaultHeadings, 'fscommon.none'],
    values: [
      {
        column: AssetColumn.NUMBER,
        propName: true,
        value: 'contractNumber',
        classes: 'notice',
      },
      {
        column: AssetColumn.CATEGORY_NAME,
        propName: true,
        value: 'categoryData.name',
      },
      {
        column: AssetColumn.PAYMENT_FREQUENCY,
        propName: true,
        value: 'paymentFrequency',
      },
      { column: AssetColumn.STATUS, propName: true, value: 'policyStatus' },
      {
        column: AssetColumn.EMPTY,
        propName: false,
        value: 'fscommon.none',
        startClaim: true,
        classes: 'notice-hover',
      },
    ],
  },
  quotes: {
    headings: defaultHeadings,
    values: [
      {
        column: AssetColumn.NUMBER,
        propName: true,
        value: 'quoteId',
        classes: 'notice',
      },
      {
        column: AssetColumn.CATEGORY_NAME,
        propName: true,
        value: 'defaultCategory.name',
      },
      {
        column: AssetColumn.PAYMENT_FREQUENCY,
        propName: true,
        value: 'paymentFrequency',
      },
      { column: AssetColumn.STATUS, propName: true, value: 'quoteStatus' },
    ],
  },
};

export const getDataByAssetType = (assetSelected): DataByAssetType => {
  return assetTableConfig[assetSelected];
};

export const getRouteByAssetType = ({
  claimNumber,
  policyNumber,
  contractNumber,
  quoteId,
}): { [key in AssetTableType]: any } => ({
  claims: {
    cxRoute: 'claimDetails',
    params: { claimId: claimNumber },
  },
  policies: {
    cxRoute: 'policyDetails',
    params: {
      policyId: policyNumber,
      contractId: contractNumber,
    },
  },
  quotes: {
    cxRoute: 'quoteDetails',
    params: { quoteId },
  },
});
