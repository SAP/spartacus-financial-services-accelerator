import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccCheckoutConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        UserIdentification: 'users/{userId}/carts/{cartId}/userIdentification',
      },
    },
  },
};
