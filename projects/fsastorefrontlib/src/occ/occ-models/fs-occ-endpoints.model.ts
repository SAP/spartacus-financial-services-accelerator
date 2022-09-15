import { OccEndpoints } from '@spartacus/core';

export interface FSOccEndpoints extends OccEndpoints {
  /**
   * Get agents
   *
   */
  agents?: string;
  /**
   * Get agent by agentID
   *
   */
  agent?: string;
  /**
   * Get list of billing times for product
   *
   */
  billingTime?: string;
  /**
   * Add to Cart
   *
   */
  addToCart?: string;
  /**
   * Start bundle
   *
   */
  startBundle?: string;
  /**
   * Get all site messages by message group
   *
   */
  siteMessages?: string;
  /**
   * Get a site message by message code
   */
  siteMessage?: string;
  /**
   * Updates the read date of provided site messages
   */
  updateMessages?: string;
  /**
   * Calculates price for a single product according to product code and product price attributes.
   */
  calculatePriceForProduct?: string;
  /**
   * Set user identification type
   */
  userIdentification?: string;
  /**
   * Get list of products which are assigned for B2B unit from organization manager.
   *
   */
  productAssignments?: string;
  /**
   * Creates product assignment for B2B unit.
   *
   */
  createProductAssignments?: string;
  /**
   * Removes product assignment for specific orgUnit.
   *
   */
  removeProductAssignments?: string;
  /**
   * Updates product assignment for specified orgUnit.
   *
   */
  updateProductAssignments?: string;
  /**
   * Get a change request with a given identifier
   *
   */
  changeRequest?: string;
  /**
   * Creates change request for user and policy
   *
   */
  createChangeRequest?: string;
  /**
   * Endpoint for change request simulation
   *
   */
  simulateChangeRequest?: string;
  /**
   * Endpoint for cancel change request by id
   *
   */
  cancelChangeRequest?: string;
  /**
   * Create a customer support ticket
   *
   */
  createCsTicket?: string;
  /**
   * Get policies
   *
   */
  policies?: string;
  /**
   * Get policy by specified policy and contract id
   *
   */
  policy?: string;
  /**
   * Get premium calendar
   *
   */
  premiumCalendar?: string;
  /**
   * Get quotes
   *
   */
  quotes?: string;
  /**
   * Get quote by id
   *
   */
  quote?: string;
  /**
   * Updates quote
   *
   */
  updateQuote?: string;
  /**
   * Invokes quote action
   *
   */
  quoteAction?: string;
  /**
   * Compare quotes
   *
   */
  compareQuotes?: string;
  /**
   * Get claims
   *
   */
  claims?: string;
  /**
   * Get claim by id
   *
   */
  claim?: string;
  /**
   * Creates a claim
   *
   */
  createClaim?: string;
  /**
   * Get a user request
   *
   */
  userRequest?: string;
  /**
   * Submits a user request
   *
   */
  submitUserRequest?: string;
  /**
   * Get documents
   *
   */
  documents?: string;
  /**
   * Disable user
   *
   */
  userCloseAccount?: string;

  /**
   * Register user
   *
   */
  userRegister?: string;

  /**
   * Get on behalf of consents
   *
   */
  oboConsents?: string;

  /**
   * Gets the list of customers created by consent holder
   *
   */
  oboConsentCustomers?: string;

  /**
   * Gets the particular customer of customers created by consent holder
   *
   */
  oboConsentCustomer?: string;

  /**
   * @deprecated since version 4.0.2
   * No longer used.
   * Use {@link #quotes} instead.
   */
  oboConsentCustomerQuotes?: string;

  /**
   * @deprecated since version 4.0.2
   * No longer used.
   * Use {@link #policies} instead.
   */
  oboConsentCustomerPolicies?: string;

  /**
   * @deprecated since version 4.0.2
   * No longer used.
   * Use {@link #claims} instead.
   */
  oboConsentCustomerClaims?: string;

  /**
   * Transfers cart to customer created by consent holder
   *
   */
  transferCart?: string;

  /**
   * Create cart of customer that gave On-Behalf-Of Consent
   *
   */
  oboConsentAddresses?: string;

  /**
   * Updates permission for OBO customer
   *
   */
  oboUpdatePermission?: string;
  /**
   * Update address OBO customer
   *
   */
  oboConsentUpdateAddress?: string;

  createAppointment?: string;
}
