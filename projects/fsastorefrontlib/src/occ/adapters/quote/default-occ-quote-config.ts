import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccQuoteConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        quotes: 'users/${userId}/insurance-quotes',
        quote: 'users/${userId}/insurance-quotes/${quoteId}',
        updateQuote: 'users/${userId}/carts/${cartId}/insurance-quotes',
        quoteAction: 'users/${userId}/carts/${cartId}/insurance-quotes/action',
        compareQuotes: 'users/${userId}/fscarts'
      },
    },
  },
};
