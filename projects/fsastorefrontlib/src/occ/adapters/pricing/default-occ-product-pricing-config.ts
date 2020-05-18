import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccProductPricingConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        calculatePriceForProduct: 'fsproducts/${productCode}/calculation',
      },
    },
  },
};
