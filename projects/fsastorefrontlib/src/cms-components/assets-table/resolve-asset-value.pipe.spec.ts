import { TestBed } from '@angular/core/testing';
import { I18nModule, TranslationService } from '@spartacus/core';
import { of } from 'rxjs';
import { getDataByAssetType } from '../../core/assets-table-config/assets-table.config';
import { ResolveAssetValuePipe } from './resolve-asset-value.pipe';

const mockedDataByAssetType = getDataByAssetType('claims');

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

describe('ResolveAssetValuePipe', () => {
  let pipe: ResolveAssetValuePipe;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslationService', ['translate']);

    TestBed.configureTestingModule({
      imports: [I18nModule],
      providers: [
        ResolveAssetValuePipe,
        {
          provide: TranslationService,
          useValue: spy,
        },
      ],
    });

    pipe = TestBed.inject(ResolveAssetValuePipe);
    translationServiceSpy = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
  });

  it('transforms claim to correct values', () => {
    mockedDataByAssetType.values.forEach((claimConfig, i) => {
      const stubValue = of(mockedClaimResult[i]);
      translationServiceSpy.translate.and.returnValue(stubValue);

      pipe.transform(claimConfig, mockedClaim).subscribe(res => {
        expect(res).toBe(mockedClaimResult[i]);
      });
    });
  });

  it('allowedFSRequestTypesIsClaim returns correct values', () => {
    expect(pipe.allowedFSRequestTypesIsClaim(mockedPolicy)).toBe(true);
  });
});
