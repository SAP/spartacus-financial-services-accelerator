import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FSStepData } from '../../occ-models';
import { UserRequestAdapter } from '../../../core/user-request/connectors/user-request.adapter';

@Injectable()
export class OccUserRequestAdapter implements UserRequestAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getUserRequest(userId: string, requestId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('userRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateUserRequest(
    userId: string,
    requestId: string,
    stepData: FSStepData
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('userRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });

    return this.http
      .patch(url, stepData, {})
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  submitUserRequest(userId: string, requestId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('submitUserRequest', {
      urlParams: {
        userId,
        requestId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const submitUserRequestAction = {
      actionName: 'SUBMIT',
    };
    return this.http
      .post(url, submitUserRequestAction, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
