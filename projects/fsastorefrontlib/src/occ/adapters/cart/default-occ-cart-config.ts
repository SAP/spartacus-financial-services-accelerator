import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccCartConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        addToCart: '/users/${userId}/carts/${cartId}/fs-add-to-cart',
        startBundle: '/users/${userId}/carts/${cartId}/fs-start-bundle',
        cart:
          '/users/${userId}/carts/${cartId}?fields=DEFAULT,paymentInfo(FULL)',
      },
    },
  },
};
