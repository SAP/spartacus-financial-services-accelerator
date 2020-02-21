import { Observable } from 'rxjs';

export abstract class FSProductAssignmentAdapter {
  /**
   * Abstract method used to load product assignments of organizational unit
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   */
  abstract loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string
  ): Observable<any>;
}
