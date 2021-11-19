import { Observable } from 'rxjs/internal/Observable';

export abstract class ConsentAdapter {
  /**
   * Abstract method used to get OBO consents for user
   *
   * @param userId The user id
   */
  abstract getConsents(userId: string): Observable<any>;
}
