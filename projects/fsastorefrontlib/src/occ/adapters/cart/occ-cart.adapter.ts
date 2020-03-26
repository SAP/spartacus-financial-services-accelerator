import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModification, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CartAdapter } from '../../../core/cart/connectors/cart.adapter';
import { PricingData } from '../../occ-models/form-pricing.interface';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  addToCart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    entryNumber: string
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});
    const url = this.getAddOptionalProductToCartEndpoint(userId, cartId);
    const params = new HttpParams({
      fromString:
        'productCode=' +
        productCode +
        '&quantity=' +
        quantity +
        FULL_PARAMS +
        '&entryNumber=' +
        entryNumber,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .post<any>(url, toAdd, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  startBundle(
    userId: string,
    cartId: string,
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): Observable<CartModification> {
    const url = this.getStartBundleForProductOfSpecifiedCart(userId, cartId);
    const params = new HttpParams({
      fromString:
        'bundleTemplateId=' +
        bundleTemplateId +
        '&productCode=' +
        productCode +
        '&quantity=' +
        quantity +
        FULL_PARAMS,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const pricingAttributesBody = JSON.stringify(pricingData);

    return this.http
      .post<any>(url, pricingAttributesBody, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getAddOptionalProductToCartEndpoint(
    userId: string,
    cartId: string
  ) {
    const addOptionalProductToCartEndpoint =
      '/users/' + userId + '/carts/' + cartId + '/fs-add-to-cart';
    return (
      this.occEndpointService.getBaseEndpoint() +
      addOptionalProductToCartEndpoint
    );
  }

  protected getStartBundleForProductOfSpecifiedCart(
    userId: string,
    cartId: string
  ) {
    const startBundleForProductOfCartEndpoint =
      '/users/' + userId + '/carts/' + cartId + '/fs-start-bundle';
    return (
      this.occEndpointService.getBaseEndpoint() +
      startBundleForProductOfCartEndpoint
    );
  }
}
