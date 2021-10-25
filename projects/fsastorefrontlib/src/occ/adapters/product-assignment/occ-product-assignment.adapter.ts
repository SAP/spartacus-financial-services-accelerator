import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { ProductAssignmentAdapter } from '../../../core/product-assignment/connectors';

@Injectable()
export class OccProductAssignmentAdapter implements ProductAssignmentAdapter {
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
    const url = this.occEndpointService.buildUrl('productAssignments', {
      urlParams: {
        userId,
        orgUnitId,
      },
    });
    let params: HttpParams = new HttpParams();
    if (active !== undefined) {
      params = params.set('active', active.toString());
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }
    if (sort) {
      params = params.set('sortCode', sort.toString());
    }
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createProductAssignment(
    userId: string,
    orgUnitId: string,
    productCode: string
  ) {
    const url = this.occEndpointService.buildUrl('createProductAssignments', {
      urlParams: {
        userId,
        orgUnitId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('productCode', productCode);
    return this.http
      .post<any>(url, JSON.stringify({}), { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeProductAssignment(
    userId: string,
    orgUnitId: string,
    fsProductAssignmentCode: string
  ) {
    const url = this.occEndpointService.buildUrl('removeProductAssignments', {
      urlParams: {
        userId,
        orgUnitId,
        fsProductAssignmentCode,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .delete<any>(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  changeActiveStatus(
    userId: string,
    orgUnitId: string,
    fsProductAssignmentCode: string,
    active: boolean
  ) {
    const url = this.occEndpointService.buildUrl('updateProductAssignments', {
      urlParams: {
        userId,
        orgUnitId,
        fsProductAssignmentCode,
      },
    });
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
}
