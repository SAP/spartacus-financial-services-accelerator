import { OccConfig } from '@spartacus/core';

export const fsaOccProductConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        productSearch:
          'products/search?fields=products(code,name,summary,defaultCategory(DEFAULT),price(FULL),images(DEFAULT)),pagination(DEFAULT),sorts(DEFAULT)',
      },
    },
  },
};
