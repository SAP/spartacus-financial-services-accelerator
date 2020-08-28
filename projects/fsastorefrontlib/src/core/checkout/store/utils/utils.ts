import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { FSCart } from '../../../../occ';

/**
 * Extract cart identifier for current user. Anonymous calls use `guid` and for logged users `code` is used.
 */
export function getCartIdByUserId(cart: FSCart, userId: string): string {
  if (userId === OCC_USER_ID_ANONYMOUS) {
    return cart.guid;
  }
  return cart.code;
}
