import { Injectable } from '@angular/core';
import {
  ConverterService,
  Facet,
  Occ,
  OccProductSearchPageNormalizer,
  PRODUCT_NORMALIZER,
  ProductSearchPage,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class FSOccProductSearchPageNormalizer extends OccProductSearchPageNormalizer {
  constructor(private converter: ConverterService) {
    super(converter);
  }

  /**
   * Overrides Spartacus filtering facet values
   */
  convert(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };
    this.normalizeValues(target);
    if (source.products) {
      target.products = source.products.map(product =>
        this.converter.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }

  protected normalizeValues(target: ProductSearchPage): void {
    if (target.facets) {
      target.facets = target.facets.map((facetSource: Facet) => {
        const { topValues, ...facetTarget } = facetSource;
        facetTarget.topValueCount =
          topValues?.length > 0 ? topValues.length : this.DEFAULT_TOP_VALUES;
        return facetTarget;
      });
    }
  }
}
