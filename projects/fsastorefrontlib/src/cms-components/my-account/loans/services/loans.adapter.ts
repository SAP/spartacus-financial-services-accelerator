import { Observable } from 'rxjs';
export abstract class LoansAdapter {
  /**
   * Method used to get all loans for current user
   */
  abstract getLoans(searchConfig: any): Observable<any>;
}
