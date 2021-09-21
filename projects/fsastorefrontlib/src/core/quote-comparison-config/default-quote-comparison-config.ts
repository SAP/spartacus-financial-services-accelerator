import { QuoteComparisonConfig } from './quote-comparison-config';

export function fsDefaultQuoteComparisonConfigFactory(): QuoteComparisonConfig {
  return {
    categoryConfig: [
      {
        categoryCode: 'insurances_auto',
        visibleInsuredObjects: ['vehicleMake', 'vehicleModel'],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_travel',
        visibleInsuredObjects: [
          'tripDestination',
          'tripStartDate',
          'costOfTrip',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
    ],
  };
}
