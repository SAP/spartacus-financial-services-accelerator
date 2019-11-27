import { Observable } from 'rxjs';

export abstract class QuoteAdapter {
  /**
   * Abstract method used to get quotes for user
   *
   * @param userId The user id
   */
  abstract getQuotes(userId: string): Observable<any>;

}
