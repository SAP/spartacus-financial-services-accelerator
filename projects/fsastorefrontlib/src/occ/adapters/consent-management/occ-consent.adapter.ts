import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { ConsentAdapter } from '../../../core/my-account/connectors/consent.adapter';
import { OBOConsentList } from '../../occ-models/occ.models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccConsentAdapter implements ConsentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  transferCartToOboCustomer(cartId: string, userId: string, oboCustomer: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('transferCart', {
      urlParams: {
        userId,
        cartId,
      },
    });

    const params: HttpParams = new HttpParams()
    .set('oboCustomerUid',  oboCustomer)

    const transferCartAction = {
      actionName: 'TRANSFER_CART',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log(url);
    console.log(params);

    return this.http
    .patch<any>(url, transferCartAction, { params })
    .pipe(catchError((error: any) => throwError(error.json())));
  }

  getConsents(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsents', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .get<OBOConsentList>(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getOBOCustomerList(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomers', {
      urlParams: {
        userId,
      },
    });
    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
