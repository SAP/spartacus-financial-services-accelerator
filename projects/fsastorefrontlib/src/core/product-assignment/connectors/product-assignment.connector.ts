import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FSProductAssignmentAdapter } from './product-assignment.adapter';

@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentConnector {
  constructor(protected productAssignmentAdapter: FSProductAssignmentAdapter) {}

  loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    active: boolean,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<any> {
    return this.productAssignmentAdapter.loadProductAssignmentsForUnit(
      userId,
      orgUnitId,
      active,
      pageSize,
      currentPage,
      sort
    );
  }

  activateProductAssignment(userId: string, productAssignmentCode: string, active: boolean): Observable<any> {
      return this.productAssignmentAdapter.activateProductAssignment(
        userId, productAssignmentCode, active);
  }
}
