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
    active?: boolean,
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

  createProductAssignment(
    userId: string,
    orgUnitId: string,
    productCode: string
  ) {
    return this.productAssignmentAdapter.createProductAssignment(
      userId,
      orgUnitId,
      productCode
    );
  }

  removeProductAssignment(
    userId: string,
    orgUnitId: string,
    productCode: string
  ) {
    return this.productAssignmentAdapter.removeProductAssignment(
      userId,
      orgUnitId,
      productCode
    );
  }

  loadCustomerProfile(userId: string, orgCustomerId: string) {
    return this.productAssignmentAdapter.loadCustomerProfile(
      userId,
      orgCustomerId
    );
  }

  changeActiveStatus(
    userId: string,
    orgUnitId: string,
    productAssignmentCode: string,
    active: boolean
  ): Observable<any> {
    return this.productAssignmentAdapter.changeActiveStatus(
      userId,
      orgUnitId,
      productAssignmentCode,
      active
    );
  }
}
