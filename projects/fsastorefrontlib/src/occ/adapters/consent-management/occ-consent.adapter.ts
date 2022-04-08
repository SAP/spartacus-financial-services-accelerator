import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Address,
  ADDRESS_SERIALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import {
  InsuranceQuoteList,
  OBOCustomerList,
} from '../../../occ/occ-models/occ.models';
import { ConsentAdapter } from '../../../core/my-account/connectors/consent.adapter';
import { OBOConsentList } from '../../occ-models/occ.models';
import { USER_SERIALIZER } from '@spartacus/user/profile/core';
import { Models } from '../../../model/quote.model';
import { QUOTE_NORMALIZER } from '../../../core/my-account/connectors/converters';
import { FSSearchConfig } from '../../../core/my-account/services/inbox-data.service';

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

  getOBOCustomerList(
    userId: string,
    searchConfig?: FSSearchConfig
  ): Observable<OBOCustomerList> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomers', {
      urlParams: {
        userId,
      },
    });
    let params = new HttpParams({ fromString: FULL_PARAMS });
    if (searchConfig?.sortCode && searchConfig?.sortOrder) {
      params = params
        .set('sortCode', searchConfig.sortCode)
        .set('sortOrder', searchConfig.sortOrder);
    }
    if (searchConfig?.currentPage) {
      params = params.set('currentPage', searchConfig.currentPage);
    }

    return this.http
      .get<OBOCustomerList>(url, { params })
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

  createOBOCustomer(userId: string, details: any): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomers', {
      urlParams: {
        userId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    details = this.converterService.convert(details, USER_SERIALIZER);
    return this.http
      .post(url, details, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getQuotesForOBOCustomer(
    userId: string,
    customerId: string
  ): Observable<Models.InsuranceQuote[]> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomerQuotes', {
      urlParams: {
        userId,
        customerId,
      },
    });
    return this.http.get<InsuranceQuoteList>(url).pipe(
      pluck('insuranceQuotes'),
      this.converterService.pipeableMany(QUOTE_NORMALIZER),
      catchError((error: any) => throwError(error.json()))
    );
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

  updateAddressForUser(
    userId: string,
    oboCustomerId: string,
    addressId: string,
    address: Address
  ): Observable<{}> {
    const url = this.occEndpointService.buildUrl('oboConsentUpdateAddress', {
      urlParams: { userId, oboCustomerId, addressId },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    address = this.converterService.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .patch(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateOBOPermission(
    userId: string,
    oboConsentHolderUid: string,
    oboPermissionName: string,
    oboPermissionValue: boolean
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboUpdatePermission', {
      urlParams: { userId },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const permissionContent = {
      actionName: 'UPDATE_PERMISSION',
    };
    let params: HttpParams = new HttpParams();
    params = params.append('oboConsentHolderUid', oboConsentHolderUid);
    params = params.append('oboPermissionName', oboPermissionName);
    params = params.append('oboPermissionValue', oboPermissionValue);

    return this.http
      .patch(url, permissionContent, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json)));
  }
}
