import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ChangeRequestAdapter } from './../../../core/change-request/connectors/change-request.adapter';
import { Observable } from 'rxjs';

@Injectable()
export class OccChangeRequestAdapter implements ChangeRequestAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getChangeRequest(userId: string, requestId: string) {
    const url = this.getChangeRequestEndpoint(userId) + '/' + requestId;
    const params = new HttpParams();
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createChangeRequestForPolicy(
    policyId: string,
    contractId: string,
    changeRequestType: string,
    userId: string
  ) {
    const url = this.getChangeRequestEndpoint(userId);
    const params: HttpParams = new HttpParams({
      fromString:
        'policyId=' +
        policyId +
        '&contractId=' +
        contractId +
        '&requestType=' +
        changeRequestType,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const toCreate = JSON.stringify({});
    return this.http
      .post<any>(url, toCreate, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  simulateChangeRequest(userId: string, requestId: string, changeRequest: any) {
    const url =
      this.getChangeRequestEndpoint(userId) + '/' + requestId + '/simulation';
    return this.http
      .post<any>(url, changeRequest)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  cancelChangeRequest(userId: string, requestId: string): Observable<any> {
    const url =
      this.getChangeRequestEndpoint(userId) + '/' + requestId + '/action';
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

  protected getChangeRequestEndpoint(userId: string) {
    const changeRequestEndpoint = '/users/' + userId + '/fsChangeRequests';
    return this.occEndpointService.getBaseEndpoint() + changeRequestEndpoint;
  }
}
