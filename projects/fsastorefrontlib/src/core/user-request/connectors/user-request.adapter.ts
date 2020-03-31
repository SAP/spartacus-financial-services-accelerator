import { Observable } from 'rxjs';
import { FSStepData } from '../../../occ/occ-models';

export abstract class UserRequestAdapter {
  /**
   * Abstract method used to get user request
   *
   * @param userId The user id
   * @param requestId The user request id
   */
  abstract getUserRequest(userId: string, requestId: string): Observable<any>;

  /**
   * Abstract method used to update user request
   *
   * @param userId The user id
   * @param requestId The user request id
   * @param stepData The FS step data
   */
  abstract updateUserRequest(
    userId: string,
    requestId: string,
    stepData?: FSStepData
  ): Observable<any>;

  /**
   * Abstract method used to submit user request
   *
   * @param userId The user id
   * @param requestId The user request id
   */
  abstract submitUserRequest(
    userId: string,
    requestId: string
  ): Observable<any>;
}
