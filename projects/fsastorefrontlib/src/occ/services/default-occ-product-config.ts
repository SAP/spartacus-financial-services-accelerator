import { OccConfig } from '@spartacus/core';

export const occProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        productSearch:
          'products/search?fields=products(code,name,summary,defaultCategory(DEFAULT),price(FULL),images(DEFAULT),bundleTemplates(DEFAULT)),pagination(DEFAULT),sorts(DEFAULT)',
        product: {
          details:
            'products/${productCode}?fields=averageRating,stock(DEFAULT),description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,configuratorType,configurable,tags,images(FULL),defaultCategory(DEFAULT),bundleTemplates(DEFAULT)',
        },
      },
    },
  },
};
