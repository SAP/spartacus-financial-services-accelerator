import { Address } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';

export abstract class ConsentAdapter {
  /**
   * Abstract method used to get OBO consents for user
   *
   * @param userId The user id
   */
  abstract getConsents(userId: string): Observable<any>;

  /**
   * Abstract method used to get the list of customers created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consents
   */
  abstract getOBOCustomerList(userId: string): Observable<any>;

  /**
   * Abstract method used to transfer cart to specified customer created by consent holder
   *
   * @param cartId The `cartId` the identifier of the current cart
   * @param userId The `userId` the identifier of the consent holder
   * @param oboCustomer The `oboCustomer` the identifier of the user on which cart is being transferred
   */
  abstract transferCartToOboCustomer(
    cartId: string,
    userId: string,
    oboCustomer: string
  ): Observable<any>;

  /**
   * Abstract method used to create address for chosen On-Behalf-Of Customer
   *
   * @param userId The `userId` the identifier of the consent holder
   * @param oboCustomerId The `userId` the identifier of the On-Behalf-Of Customer
   * @param address The `address` the address data
   */
  abstract createAddressForUser(
    userId: string,
    oboCustomerId: string,
    address: Address
  ): Observable<{}>;
}
