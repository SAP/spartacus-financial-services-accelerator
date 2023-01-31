const whatsIncluded = "What's Included";
const addedByYou = 'Added by you';
const personalDetails = 'Personal Details';
const generalDetails = 'General Details';
const policySummary = 'Policy Summary';
const whoOrWhatInsured = 'Who or What Is Insured';
const optionalExtras = 'Optional Extras';

export const quoteReviewAccordionGroup1 = [
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const quoteReviewAccordionGroup2 = [
  generalDetails,
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const quoteReviewWithoutOptionalProducts = [
  generalDetails,
  whatsIncluded,
  personalDetails,
];

export const finalReviewAccordionLife = [
  'Life Insurance Information',
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const finalReviewAccordionTravel = [
  'Travel Insurance Information',
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const policyDetailsAccordions = [
  policySummary,
  whoOrWhatInsured,
  whatsIncluded,
  optionalExtras,
  ' What Does It Cost Me? ',
];

export const policyDetailsIntegration = [
  policySummary,
  whoOrWhatInsured,
  whatsIncluded,
  optionalExtras,
  ' What Does It Cost Me? ',
  ' Documents',
];

export const agentListViewAccordions = [
  ' Homeowners Insurance',
  ' Renters Insurance',
  ' Auto Insurance',
  ' Life Insurance',
  ' Travel Insurance',
  ' Event Insurance',
  ' Savings Insurance',
  ' Loan Application',
  ' Fixed Term Deposit Application',
  ' Credit Card Application',
  ' Current Account Application',
];

export const finalReviewAccordionHomeowners = [
  'Homeowners Insurance Information',
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const finalReviewAccordionRenters = [
  'Renters Insurance Information',
  whatsIncluded,
  addedByYou,
  personalDetails,
];

export const quoteReviewAccordionSavings = [
  generalDetails,
  whatsIncluded,
  addedByYou,
  'Investments Details',
  personalDetails,
];

export const finalReviewAccordionSavings = [
  'Savings Insurance Information',
  whatsIncluded,
  addedByYou,
  'Investments Details',
  personalDetails,
];

export const savingsAccordionsWithoutOptional = [
  generalDetails,
  whatsIncluded,
  'Investments Details',
  personalDetails,
];

export const policyDetailsSavings = [
  policySummary,
  whoOrWhatInsured,
  whatsIncluded,
  optionalExtras,
  'Investment Details',
  'What Does It Cost Me',
];

export const compareQuoteAccordion = [
  'Quote General Information',
  'Quote Billing Events',
  'Quote Optional Extras',
];

export const compareEventQuoteAccordion = [
  'Quote Billing Events',
  'Quote Optional Extras',
];

export const eventAccordionWithoutOptional = [whatsIncluded, personalDetails];

export const Accordions = {
  accordions: [
    {
      category: 'generalQuoteAccordions',
      accordionItems: this.quoteReviewAccordionGroup2,
    },
    {
      category: 'threeAccordions',
      accordionItems: this.quoteReviewAccordionGroup1,
    },
    {
      category: 'currentAccount',
      accordionItems: this.quoteReviewAccordionGroup1,
    },
    {
      category: 'lifeFinalReview',
      accordionItems: this.finalReviewAccordionLife,
    },
    {
      category: 'travelFinalReview',
      accordionItems: this.finalReviewAccordionTravel,
    },
    {
      category: 'policyDetails',
      accordionItems: this.policyDetailsAccordions,
    },
    {
      category: 'agentListView',
      accordionItems: this.agentListViewAccordions,
    },
    {
      category: 'homeownersFinalReview',
      accordionItems: this.finalReviewAccordionHomeowners,
    },
    {
      category: 'rentersFinalReview',
      accordionItems: this.finalReviewAccordionRenters,
    },
    {
      category: 'savingsQuoteReview',
      accordionItems: this.quoteReviewAccordionSavings,
    },
    {
      category: 'savingsFinalReview',
      accordionItems: this.finalReviewAccordionSavings,
    },
    {
      category: 'savingsPolicyDetails',
      accordionItems: this.policyDetailsSavings,
    },
    {
      category: 'integrationPolicyDetails',
      accordionItems: this.policyDetailsIntegration,
    },
    {
      category: 'quoteReviewWithoutOptional',
      accordionItems: this.quoteReviewWithoutOptionalProducts,
    },
    {
      category: 'compareQuote',
      accordionItems: this.compareQuoteAccordion,
    },
    {
      category: 'compareEventQuote',
      accordionItems: this.compareEventQuoteAccordion,
    },
    {
      category: 'savingsAccordions',
      accordionItems: this.savingsAccordionsWithoutOptional,
    },
    {
      category: 'eventAccordionsNoOptional',
      accordionItems: this.eventAccordionWithoutOptional,
    },
  ],
};
