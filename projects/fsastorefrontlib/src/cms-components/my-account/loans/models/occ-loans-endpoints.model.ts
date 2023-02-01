import { OccEndpoints } from '@spartacus/core';

export interface OccLoansEndpoints extends OccEndpoints {
  /**
   * Get active loans
   */
  loans?: string;
}
