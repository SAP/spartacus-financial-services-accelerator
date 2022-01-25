import { Address, User } from '@spartacus/core';
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
   * Abstract method used to get the particular customer of customers created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consent holder
   *
   * @param customerId The `customerId` used for fetching particular customer
   */
  abstract getOBOCustomer(userId: string, customerId: string): Observable<any>;

  /**
   * Creates the user's details of customer created by seller.
   *
   * @param consentHolder The 'consenHolder' that is creating the customer
   * @param details User details to be created.
   */
  abstract createOBOCustomer(
    consentHolder: string,
    details: User
  ): Observable<any>;

  /**
   * Abstract method used to get quotes of the particular customer created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consent holder
   *
   * @param customerId The `customerId` used for fetching particular customer
   */
  abstract getQuotesForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<any>;

  /**
   * Abstract method used to get policies of the particular customer created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consent holder
   *
   * @param customerId The `customerId` used for fetching particular customer
   */
  abstract getPoliciesForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<any>;

  /**
   * Abstract method used to get claims of the particular customer created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consent holder
   *
   * @param customerId The `customerId` used for fetching particular customer
   */
  abstract getClaimsForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<any>;

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

  /**
   * Abstract method used to update permissions given to Consent Holder
   *
   * @param userId The `userId` identifier of the consent holder
   * @param oboConsentHolderUid `Uid` of customer created by consent holder for which permission should be updated.
   * @param oboPermissionName Name of the permission which should be updated.
   * @param oboPermissionValue Permission `value` which should be updated.
   */
  abstract updateOBOPermission(
    userId: string,
    oboConsentHolderUid: string,
    oboPermissionName: string,
    oboPermissionValue: boolean
  ): Observable<{}>;
}
