import { Observable } from 'rxjs';

export abstract class FSProductAssignmentAdapter {
  /**
   * Abstract method used to load product assignments of organizational unit
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   * @param active: The assignment state
   * @param pageSize The page size
   * @param currentPage The current page
   * @param sort The sorting method
   */
  abstract loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    active: boolean,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<any>;
}
