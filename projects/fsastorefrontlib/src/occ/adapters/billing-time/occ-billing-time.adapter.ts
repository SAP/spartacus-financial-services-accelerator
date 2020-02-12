import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { OccEndpointsService } from '@spartacus/core';
import { BillingTimeAdapter } from '../../../core/checkout/services/billing-time/connectors/billing-time.adapter';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccBillingTimeAdapter implements BillingTimeAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public getBillingTimes(productCodes: string[]): Observable<any> {
    const url = this.getBillingTimesEndPoint();
    const params = new HttpParams({
      fromString: 'productCodes=' + productCodes + FULL_PARAMS,
    });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getBillingTimesEndPoint() {
    const billingTimeEndpoint = '/billing-times';
    return this.occEndpointService.getBaseEndpoint() + billingTimeEndpoint;
  }
}
