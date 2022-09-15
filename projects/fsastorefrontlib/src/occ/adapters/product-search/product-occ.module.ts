import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PRODUCT_SEARCH_PAGE_NORMALIZER } from '@spartacus/core';
import { FSOccProductSearchPageNormalizer } from './occ-product-search-page-normalizer';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: PRODUCT_SEARCH_PAGE_NORMALIZER,
      useExisting: FSOccProductSearchPageNormalizer,
      multi: true,
    },
  ],
})
export class FSProductOccModule {}
