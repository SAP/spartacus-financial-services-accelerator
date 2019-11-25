import { FSStepData } from './../../../../../../dist/fsastorefrontlib/occ/occ-models/occ.models.d';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccUserRequestService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getUserRequestEndpoint(userId: string, requestId: string) {
    const userRequestEndpoint = '/users/' + userId + '/requests/' + requestId;
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
    console.log('update occ');
    console.log(stepData);
    return this.http
      .patch(url, stepData, {})
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
