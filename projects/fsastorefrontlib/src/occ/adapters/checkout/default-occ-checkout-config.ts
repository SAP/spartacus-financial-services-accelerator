import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccCheckoutConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        userIdentification:
          'users/${userId}/carts/${cartId}/userIdentification',
      },
    },
  },
};
