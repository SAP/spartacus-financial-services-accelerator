import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class OccFSCheckoutService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public setIdentificationType(
    identificationType: string,
    cartId: string,
    userId: string
  ) {
    const url = this.getUserIdentificationEndpoint(userId, cartId);
    const params: HttpParams = new HttpParams().set(
      'identificationType',
      identificationType
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put<any>(url, null, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  protected getUserIdentificationEndpoint(userId: string, cartId: string) {
    const userIdentificationEndpoint =
      '/users/' + userId + '/carts/' + cartId + '/user-identification';
    return (
      this.occEndpointService.getBaseEndpoint() + userIdentificationEndpoint
    );
  }
}
