import { TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { getDataByAssetType } from '../../core/assets-table-config/assets-table.config';
import { ResolveAssetValuePipe } from './resolve-asset-value.pipe';

const mockedDefaultHeadings: string[] = [
  'fscommon.application.number',
  'dashboard.name',
  'fscommon.paymentFrequency',
  'fscommon.status',
];

const mockedDataByAssetType = getDataByAssetType(mockedDefaultHeadings);

const mockedClaim = {
  claimNumber: 'CL00002019',
  claimStatus: 'OPEN',
  insurancePolicy: {
    categoryData: { name: 'Auto Insurance' },
    paymentFrequency: 'Monthly',
  },
};
const mockedClaimResult = ['CL00002019', 'Auto Insurance', 'Monthly', 'OPEN'];

const mockedPolicy = {
  categoryData: {
    name: 'Auto Insurance',
    code: 'insurances_auto',
    allowedFSRequestTypes: [
      { code: 'fsclaim_request_type', requestType: { code: 'FSCLAIM' } },
    ],
  },
  contractNumber: '00001000',
  orderNumber: '00001000',
  paymentFrequency: 'Monthly',
  policyStatus: 'Active',
};
const mockedPolicyResult = [
  '00001000',
  'Auto Insurance',
  'Monthly',
  'Active',
  'fscommon.create',
];

describe('ResolveAssetValuePipe', () => {
  let pipe: ResolveAssetValuePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockTranslatePipe],
      providers: [
        ResolveAssetValuePipe,
        {
          provide: TranslatePipe,
          useClass: MockTranslatePipe,
        },
      ],
    });

    pipe = TestBed.inject(ResolveAssetValuePipe);
  });

  it('transforms claim to correct values', () => {
    mockedDataByAssetType.claims.values.forEach((claimConfig, i) => {
      expect(pipe.transform(claimConfig, mockedClaim)).toBe(
        mockedClaimResult[i]
      );
    });
  });

  it('transforms policy to correct values', () => {
    mockedDataByAssetType.policies.values.forEach((policyConfig, i) => {
      expect(pipe.transform(policyConfig, mockedPolicy)).toBe(
        mockedPolicyResult[i]
      );
    });
  });
});
