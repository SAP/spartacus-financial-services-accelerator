import { Observable } from 'rxjs';

export abstract class UserRequestAdapter {
  /**
   * Abstract method used to get user request
   *
   * @param userId The user id
   * @param userId The user request id
   */
  abstract getUserRequest(userId: string, requestId: string): Observable<any>;

}
