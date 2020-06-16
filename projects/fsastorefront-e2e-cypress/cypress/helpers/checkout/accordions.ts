export const quoteReviewAccordionGroup1 = [
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const quoteReviewAccordionGroup2 = [
  'General Details',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const finalReviewAccordionLife = [
  'Life Insurance Information',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const finalReviewAccordionTravel = [
  'Travel Insurance Information',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const policyDetailsAccordions = [
  ' Policy Summary ',
  ' Who or What Is Insured ',
  " What's Included ",
  ' Optional Extras ',
  ' What Does It Cost Me? ',
];

export const agentListViewAccordions = [
  ' Homeowners ',
  ' Renters ',
  ' Auto ',
  ' Life ',
  ' Travel ',
  ' Event ',
  ' Savings ',
];

export const finalReviewAccordionHomeowners = [
  'Homeowners Insurance Information',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const finalReviewAccordionRenters = [
  'Renters Insurance Information',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const confirmationAccordionCreditCard = [
  'Credit Card Information',
  "What's Included",
  'Added by you',
  'Personal Details',
];

export const Accordions = {
  accordions: [
    {
      category: 'lifeQuoteReview',
      accordionItems: this.quoteReviewAccordionGroup2,
    },
    {
      category: 'auto',
      accordionItems: this.quoteReviewAccordionGroup1,
    },
    {
      category: 'travelQuoteReview',
      accordionItems: this.quoteReviewAccordionGroup2,
    },
    {
      category: 'currentAccount',
      accordionItems: this.quoteReviewAccordionGroup1,
    },
    {
      category: 'creditCard',
      accordionItems: this.quoteReviewAccordionGroup2,
    },
    {
      category: 'creditCardConfirmation',
      accordionItems: this.confirmationAccordionCreditCard,
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
      category: 'propertyQuoteReview',
      accordionItems: this.quoteReviewAccordionGroup2,
    },
    {
      category: 'homeownersFinalReview',
      accordionItems: this.finalReviewAccordionHomeowners,
    },
    {
      category: 'rentersFinalReview',
      accordionItems: this.finalReviewAccordionRenters,
    },
  ],
};
