import { Observable } from 'rxjs';

export abstract class BillingTimeAdapter {
  /**
   * Abstract method used to get billing times for specific products
   *
   * @param productCodes The `productCodes` used for fetching billing times
   */
  abstract getBillingTimes(productCodes: string[]): Observable<any>;
}
