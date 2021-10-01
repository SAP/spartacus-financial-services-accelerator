import { QuoteComparisonConfig } from './quote-comparison-config';

export function fsDefaultQuoteComparisonConfigFactory(): QuoteComparisonConfig {
  return {
    categoryConfig: [
      {
        categoryCode: 'insurances_auto',
        visibleInsuredObjects: [
          'vehicleMake',
          'vehicleModel',
          'vehicleType',
          'vehicleYear',
          'vehicleAnnualMileage',
          'vehicleValue',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_travel',
        visibleInsuredObjects: [
          'tripDestination',
          'tripStartDate',
          'costOfTrip',
          'tripEndDate',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_savings',
        visibleInsuredObjects: [
          'contributionFrequency',
          'contribution',
          'annualContributionIncrease',
          'retirementAge',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_property_homeowners',
        visibleInsuredObjects: [
          'propertyType',
          'propertyValue',
          'ccaBuiltYear',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_property_renters',
        visibleInsuredObjects: [
          'propertyType',
          'propertyValue',
          'ccaBuiltYear',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_life',
        visibleInsuredObjects: [
          'lifeCoverageRequire',
          'lifeCoverageLast',
          'lifeMainDob',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'banking_current_account',
        visibleInsuredObjects: ['accountType', 'debit-card-design'],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'banking_credit_card',
        visibleInsuredObjects: ['debit-card-design', 'minimum-card-amount'],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'banking_loans',
        visibleInsuredObjects: [
          'loan-amount',
          'loan-term',
          'repayment-frequency',
          'loanPurpose',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'banking_fixed_term_deposit',
        visibleInsuredObjects: [
          'term-amount',
          'deposit-term',
          'maturity-option',
        ],
        billingEvents: true,
        optionalProducts: true,
      },
      {
        categoryCode: 'insurances_event',
        visibleInsuredObjects: [],
        billingEvents: true,
        optionalProducts: true,
      },
    ],
  };
}
