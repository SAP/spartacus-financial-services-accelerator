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
   * Abstract method used to get the list of customers created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consents
   */
     abstract transferCartToOboCustomer(cartId: string, userId: string, oboCustomer: string): Observable<any>;
}
