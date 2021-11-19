import { Observable } from 'rxjs';

export abstract class MyDashboardAdapter {
  /**
   * Abstract method used to get on behalf of consents.
   *
   * @param userId The `userId` used for fetching on behalf of consents
   */
  abstract getOBOConsents(userId: string): Observable<any>;

  /**
   * Abstract method used to get the list of customers created by consent holder.
   *
   * @param userId The `userId` used for fetching on behalf of consents
   */
  abstract getOBOCustomerList(userId: string): Observable<any>;
}
