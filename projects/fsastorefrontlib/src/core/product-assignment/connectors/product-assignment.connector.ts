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
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<any> {
    return this.productAssignmentAdapter.loadProductAssignmentsForUnit(
      userId,
      orgUnitId,
      pageSize,
      currentPage,
      sort
    );
  }
}
