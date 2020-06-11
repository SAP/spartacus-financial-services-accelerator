import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccProductPricingConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        calculatePriceForProduct: 'fsproducts/${productCode}/calculation',
        product: {
          details:
            'products/${productCode}?fields=averageRating,stock(DEFAULT),description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,configuratorType,configurable,tags,images(FULL),defaultCategory(DEFAULT)',
        },
      },
    },
  },
};
