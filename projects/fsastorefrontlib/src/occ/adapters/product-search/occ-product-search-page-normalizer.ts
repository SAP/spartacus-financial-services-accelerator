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
    if (source.products) {
      target.products = source.products.map(product =>
        this.converter.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }
}
