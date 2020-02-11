import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { FSStepData } from '../../occ-models';
import { UserRequestAdapter } from '../../../core/user-request/connectors/user-request.adapter';

@Injectable()
export class OccUserRequestAdapter implements UserRequestAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getUserRequestEndpoint(userId: string, requestId: string) {
    const userRequestEndpoint =
      '/users/' + userId + '/fsUserRequests/' + requestId;
    return this.occEndpointService.getBaseEndpoint() + userRequestEndpoint;
  }

  public getUserRequest(userId: string, requestId: string): Observable<any> {
    const url = this.getUserRequestEndpoint(userId, requestId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public updateUserRequest(
    userId: string,
    requestId: string,
    stepData: FSStepData
  ): Observable<any> {
    const url = this.getUserRequestEndpoint(userId, requestId);
    return this.http
      .patch(url, stepData, {})
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
