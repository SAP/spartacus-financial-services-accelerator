import { TestBed } from '@angular/core/testing';
import { ConverterService, Occ } from '@spartacus/core';

import { FSOccProductSearchPageNormalizer } from './occ-product-search-page-normalizer';
import createSpy = jasmine.createSpy;

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: Occ.ProductSearchPage = {
  products: [{ images: [] }, { images: [] }],
  facets: [
    {
      name: 'facet-1',
      values: [{ count: 1 }, { count: 2 }, { count: 3 }],
      topValues: [{}, {}],
    } as Occ.Facet,
  ],
};

const mockFacets: Occ.ProductSearchPage = {
  facets: [
    {
      name: 'facet-1',
      values: [{ count: 2 }, { count: 2 }],
    },
    {
      name: 'facet-2',
      values: [{ count: 2 }, { count: 2 }, { count: 2 }],
    },
  ] as Occ.Facet[],
};

describe('FSOccProductSearchPageNormalizer', () => {
  let normalizer: FSOccProductSearchPageNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        FSOccProductSearchPageNormalizer,
      ],
    });

    normalizer = TestBed.inject(FSOccProductSearchPageNormalizer);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const converter = TestBed.inject(ConverterService);

    const result = normalizer.convert(mockSource);
    const expected = [
      { images: ['images' as any] },
      { images: ['images' as any] },
    ] as any;
    expect(result.products).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });

  describe('not change facet value count', () => {
    it('should not remove facet from facet list', () => {
      const result = normalizer.convert(mockFacets);
      expect(result.facets.length).toEqual(2);
    });

    it('should handle empty facets', () => {
      mockFacets.facets = null;
      const result = normalizer.convert(mockFacets);
      expect(result).toEqual(mockFacets as any);
    });
  });
});
