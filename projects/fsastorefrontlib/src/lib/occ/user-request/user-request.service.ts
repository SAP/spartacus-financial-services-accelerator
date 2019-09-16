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
    const userRequestEndpoint = '/users/' + userId + '/fsStepGroup/' + requestId;
    return (
      (this.occEndpointService.getBaseEndpoint() +
      userRequestEndpoint
    ));
  }

  public getUserRequest(userId: string, requestId: string): Observable<any> {
    const url = this.getUserRequestEndpoint(userId, requestId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}