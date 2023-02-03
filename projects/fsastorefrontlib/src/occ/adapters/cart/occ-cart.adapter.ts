import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartAdapter } from '../../../core/cart/connectors/cart.adapter';
import { PricingData } from '../../occ-models/form-pricing.interface';

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
    const url = this.occEndpointService.buildUrl('addToCart', {
      urlParams: {
        userId,
        cartId,
      },
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
    const url = this.occEndpointService.buildUrl('startBundle', {
      urlParams: {
        userId,
        cartId,
      },
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
