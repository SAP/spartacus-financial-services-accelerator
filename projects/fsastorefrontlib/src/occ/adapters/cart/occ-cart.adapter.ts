import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CartModification,
  OccEndpointsService,
  ConverterService,
  CART_NORMALIZER,
  Occ,
} from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CartAdapter } from '../../../core/cart/connectors/cart.adapter';
import { PricingData } from '../../occ-models/form-pricing.interface';
import { FSCart } from '../../occ-models';

@Injectable()
export class OccCartAdapter implements CartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<FSCart> {
    const toAdd = JSON.stringify({});

    let params = {};

    if (oldCartId) {
      params = { oldCartId: oldCartId };
    }
    if (toMergeCartGuid) {
      params['toMergeCartGuid'] = toMergeCartGuid;
    }

    return this.http
      .post<Occ.Cart>(
        this.occEndpointService.getUrl('createCart', { userId }, params),
        toAdd
      )
      .pipe(this.converterService.pipeable(CART_NORMALIZER));
  }

  addToCart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    entryNumber: string
  ): Observable<CartModification> {
    const toAdd = JSON.stringify({});
    const url = this.occEndpointService.getUrl('addToCart', {
      userId,
      cartId,
    });
    const params: HttpParams = new HttpParams()
      .set('productCode', productCode)
      .set('quantity', quantity.toString())
      .set('entryNumber', entryNumber)
      .set('fields', 'FULL');
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
    const url = this.occEndpointService.getUrl('startBundle', {
      userId,
      cartId,
    });
    const params: HttpParams = new HttpParams()
      .set('bundleTemplateId', bundleTemplateId)
      .set('productCode', productCode)
      .set('quantity', quantity.toString())
      .set('fields', 'FULL');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const pricingAttributesBody = JSON.stringify(pricingData);

    return this.http
      .post<any>(url, pricingAttributesBody, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
