import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, Product } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { PricingData } from '../../../core/models/pricing.interface';
import { ProductPricingAdapter } from '../../../core/checkout/services/pricing/connectors/product-pricing.adapter';

const FULL_PARAMS = 'fields=DEFAULT';

@Injectable({ providedIn: 'root' })
export class OccProductPricingAdapter implements ProductPricingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public getCalculatedProductData(
    productCode: string,
    pricingData: PricingData
  ): Observable<Product> {
    const url = this.getCalculateProductPriceEndpoint(productCode);
    const params = new HttpParams({ fromString: FULL_PARAMS });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const pricingAttributesBody = JSON.stringify(pricingData);

    return this.http
      .post<any>(url, pricingAttributesBody, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getCalculateProductPriceEndpoint(productCode: string) {
    const calculateProductPriceEndpoint = '/product-pricing/' + productCode;
    return (
      this.occEndpointService.getBaseEndpoint() + calculateProductPriceEndpoint
    );
  }
}
