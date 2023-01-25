import { Observable } from 'rxjs';

export abstract class LoanCalculatorAdapter {
  /**
   * Method used to get calculated Annuity based on body
   *
   * @param body Ticket Details Id
   */
  abstract getAnnuity(body: any, product: string): Observable<any>;

  /**
   * Method used to get possible Repayment Frequencies
   */
  abstract getRepaymentFrequencies(): Observable<any>;
}
