import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Address,
  ADDRESS_SERIALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { InsuranceQuoteList } from '../../../occ/occ-models/occ.models';
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

  transferCartToOboCustomer(
    cartId: string,
    userId: string,
    oboCustomer: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('transferCart', {
      urlParams: {
        userId,
        cartId,
      },
    });

    const params: HttpParams = new HttpParams().set(
      'oboCustomerUid',
      oboCustomer
    );

    const transferCartAction = {
      actionName: 'TRANSFER_CART',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

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

  getOBOCustomer(userId: string, customerId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomer', {
      urlParams: {
        userId,
        customerId,
      },
    });
    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getQuotesForOBOCustomer(userId: string, customerId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomerQuotes', {
      urlParams: {
        userId,
        customerId,
      },
    });
    return this.http
      .get<InsuranceQuoteList>(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPoliciesForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomerPolicies', {
      urlParams: {
        userId,
        customerId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getClaimsForOBOCustomer(userId: string, customerId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomerClaims', {
      urlParams: {
        userId,
        customerId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  createAddressForUser(
    userId: string,
    oboCustomerId: string,
    address: Address
  ): Observable<{}> {
    const url = this.occEndpointService.buildUrl('oboConsentAddresses', {
      urlParams: { userId, oboCustomerId },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    address = this.converterService.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .post(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
