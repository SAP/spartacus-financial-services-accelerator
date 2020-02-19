import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ChangeRequestAdapter } from './../../../core/change-request/connectors/change-request.adapter';
import { of } from 'rxjs';

@Injectable()
export class OccChangeRequestAdapter implements ChangeRequestAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createChangeRequestForPolicy(
    policyId: string,
    contractId: string,
    userId: string
  ) {
    const url = this.getChangeRequestEndpoint(userId);
    const params: HttpParams = new HttpParams({
      fromString: 'policyId' + policyId + 'contractId' + contractId,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const toCreate = JSON.stringify({});
    return this.http
      .post<any>(url, toCreate, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getChangeRequestEndpoint(userId: string) {
    const changeRequestEndpoint = '/users/' + userId + '/fsChangeRequests';
    return this.occEndpointService.getBaseEndpoint() + changeRequestEndpoint;
  }
}
