import { Observable } from 'rxjs';
import {
  CustomSearchConfig,
  LoanSearchData,
  Loan,
} from '../models/loan-interface';

export abstract class LoansAdapter {
  /**
   * Method used to get all loans for current user
   */
  abstract getLoans(searchConfig: any): Observable<any>;

  /**
   * Method used to get loan details by id
   * @param id id of loan
   */
  // abstract getLoanDetailsById(id: string): Observable<Loan>;
}
