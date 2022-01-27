import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
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
