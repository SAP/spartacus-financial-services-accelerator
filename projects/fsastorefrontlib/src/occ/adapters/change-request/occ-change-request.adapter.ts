import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ChangeRequestAdapter } from './../../../core/change-request/connectors/change-request.adapter';
import { Observable } from 'rxjs';
import { OccEndpointsService } from '@spartacus/core';

@Injectable()
export class OccChangeRequestAdapter implements ChangeRequestAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getChangeRequest(userId: string, requestId: string) {
    const url = this.occEndpointService.buildUrl('changeRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createChangeRequestForPolicy(
    policyId: string,
    contractId: string,
    changeRequestType: string,
    userId: string
  ) {
    const httpParams: HttpParams = new HttpParams()
      .set('policyId', policyId)
      .set('contractId', contractId)
      .set('requestType', changeRequestType);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const url = this.occEndpointService.buildUrl('createChangeRequest', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .post<any>(url, httpParams, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  simulateChangeRequest(userId: string, requestId: string, changeRequest: any) {
    const url = this.occEndpointService.buildUrl('simulateChangeRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });
    return this.http
      .post<any>(url, changeRequest)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  cancelChangeRequest(userId: string, requestId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('cancelChangeRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const cancelChangeRequestBody = {
      actionName: 'CANCEL',
    };
    return this.http
      .post(url, cancelChangeRequestBody, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
