import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { FSOccCartNormalizer } from './occ-cart-normalizer';

class MockConverterService {
  convert() {}
}
const mockCart = {
  code: '1',
  entries: [
    {
      entryNumber: 102121,
      configurationInfos: [
        {
          configurationValues: {
            entry: [
              {
                key: 'testKey',
                value: 'testValue',
              },
            ],
          },
        },
      ],
    },
  ],
  insuranceQuote: {
    quoteDetails: {
      entry: [
        {
          key: 'numberOfTravellers',
          value: '1',
        },
      ],
    },
    insuredObjectList: {
      insuredObjects: [
        {
          insuredObjectItems: [
            {
              key: 'itemKey',
              value: 'itemValue',
            },
          ],
          childInsuredObjectList: {
            insuredObjects: [
              {
                insuredObjectItems: [
                  {
                    key: 'childItemKey',
                    value: 'childItemValue',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
};
describe('FSOccCartNormalizer', () => {
  let occCartNormalizer: FSOccCartNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FSOccCartNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occCartNormalizer = TestBed.inject(FSOccCartNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callFake((product => ({
      ...product,
      code: product.code + 'converted',
    })) as any);
  });

  it('should be created', () => {
    expect(occCartNormalizer).toBeTruthy();
  });

  it('should serialize Quote Details', () => {
    const result = occCartNormalizer.convert(mockCart);
    expect(result.insuranceQuote.quoteDetails.numberOfTravellers).toEqual('1');
  });

  it('should not serialize Quote Details when cart has no insuranceQuote defined', () => {
    const mockCartNoInsuranceQuote = {
      code: '1',
      entries: [
        {
          entryNumber: 102121,
          configurationInfos: [
            {
              configurationValues: {
                entry: [
                  {
                    key: 'testKey',
                    value: 'testValue',
                  },
                ],
              },
            },
          ],
        },
      ],
    };
    const serializedMockCartNoInsuranceQuote = {
      code: '1',
      entries: [
        {
          entryNumber: 102121,
          configurationInfos: [
            {
              configurationValues: {
                testKey: 'testValue',
              },
            },
          ],
        },
      ],
    };
    const result = occCartNormalizer.convert(mockCartNoInsuranceQuote);
    expect(result).toEqual(serializedMockCartNoInsuranceQuote);
  });

  it('should serialize Configuration Infos', () => {
    const result = occCartNormalizer.convert(mockCart);
    expect(
      result.entries[0].configurationInfos[0].configurationValues.testKey
    ).toEqual('testValue');
  });
});
