import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CheckoutAdapter } from '../../../core/checkout/connectors/checkout.adapter';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  setIdentificationType(
    identificationType: string,
    cartId: string,
    userId: string
  ) {
    const url = this.occEndpointService.buildUrl('userIdentification', {
      urlParams: {
        userId,
        cartId,
      },
    });
    const params: HttpParams = new HttpParams().set(
      'identificationType',
      identificationType
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .patch<any>(url, null, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
