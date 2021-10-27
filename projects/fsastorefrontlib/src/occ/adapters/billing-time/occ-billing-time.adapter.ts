import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { OccEndpointsService } from '@spartacus/core';
import { BillingTimeAdapter } from '../../../core/product-pricing/connectors/billing-time.adapter';

@Injectable()
export class OccBillingTimeAdapter implements BillingTimeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getBillingTimes(productCodes: string[]): Observable<any> {
    const url = this.occEndpointService.buildUrl('billingTime');
    const params: HttpParams = new HttpParams()
      .set('productCodes', productCodes.toString())
      .set('fields', 'FULL');

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
