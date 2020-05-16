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
  SiteMessages?: string;
  /**
   * Get a site message by message code
   */
  SiteMessage?: string;
  /**
   * Updates the read date of provided site messages
   */
  UpdateMessages?: string;
  /**
   * Set user identification type
   */
  UserIdentification?: string;
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
   * Updates quote
   *
   */
  updateQuote?: string;
  /**
   * Binds a quote
   *
   */
  bindQuote?: string;
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
}
