import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FSProductAssignmentAdapter } from './product-assignment.adapter';

@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentConnector {
  constructor(protected productAssignmentAdapter: FSProductAssignmentAdapter) {}

  loadProductAssignmentsForUnit(userId, orgUnitId): Observable<any> {
    return this.productAssignmentAdapter.loadProductAssignmentsForUnit(
      userId,
      orgUnitId
    );
  }
}
