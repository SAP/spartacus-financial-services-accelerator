import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { FSProductAssignmentAdapter } from '../../../core/product-assignment/connectors';

@Injectable()
export class OccFSProductAssignmentAdapter
  implements FSProductAssignmentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    active?: boolean,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<any> {
    const url = this.getChangeRequestEndpoint(userId, orgUnitId);
    const params = {};
    if (active !== undefined) {
      params['active'] = active.toString();
    }
    if (pageSize) {
      params['pageSize'] = pageSize.toString();
    }
    if (currentPage) {
      params['currentPage'] = currentPage.toString();
    }
    if (sort) {
      params['sortCode'] = sort.toString();
    }
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  changeActiveStatus(
    userId: string,
    orgUnitId: string,
    productAssignmentCode: string,
    active: boolean
  ) {
    const url = this.getUpdateProductAssignmentEndpoint(
      userId,
      orgUnitId,
      productAssignmentCode
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const productAssignmentBody = {
      active: active,
    };
    return this.http
      .patch<any>(url, productAssignmentBody, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getChangeRequestEndpoint(userId: string, orgUnitId: string) {
    const productAssignmentsEndpoint =
      '/users/' + userId + '/orgUnits/' + orgUnitId + '/fsProductAssignments';
    return (
      this.occEndpointService.getBaseEndpoint() + productAssignmentsEndpoint
    );
  }

  protected getUpdateProductAssignmentEndpoint(
    userId: string,
    orgUnitId,
    productAssignmentCode: string
  ) {
    const updateProductAssignmentEndpoint =
      '/users/' +
      userId +
      '/orgUnits/' +
      orgUnitId +
      '/fsProductAssignments/' +
      productAssignmentCode;
    return (
      this.occEndpointService.getBaseEndpoint() +
      updateProductAssignmentEndpoint
    );
  }
}
