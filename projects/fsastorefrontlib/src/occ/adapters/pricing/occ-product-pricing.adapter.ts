import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, Product } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { ProductPricingAdapter } from '../../../core/product-pricing/connectors/product-pricing.adapter';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Injectable({ providedIn: 'root' })
export class OccProductPricingAdapter implements ProductPricingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getCalculatedProductData(
    productCode: string,
    pricingData: PricingData
  ): Observable<Product> {
    const url = this.occEndpointService.buildUrl('calculatePriceForProduct', {
      urlParams: {
        productCode,
      },
    });
    const params: HttpParams = new HttpParams().set('fields', 'DEFAULT');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const pricingAttributesBody = JSON.stringify(pricingData);

    return this.http
      .post<any>(url, pricingAttributesBody, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
