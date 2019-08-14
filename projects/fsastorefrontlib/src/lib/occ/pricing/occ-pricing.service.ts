import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { PricingData } from '../../checkout/assets/models/pricing.interface';

const FULL_PARAMS = 'fields=DEFAULT';

@Injectable()
export class OccPricingService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) { }

  public getProductPrices(productCode: string, priceData: PricingData): Observable<any> {
    const url = this.getCalculateProductPriceEndpoint(productCode);
    const params = new HttpParams({ fromString: FULL_PARAMS });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const pricingAttributesBody = JSON.stringify(priceData);

    console.log(url);
    console.log(params);
    console.log(pricingAttributesBody);
    return this.http
      .post<any>(url, pricingAttributesBody, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getCalculateProductPriceEndpoint(productCode: string) {
    const calculateProductPriceEndpoint = '/product-pricing/' + productCode;
    return (
      (this.occEndpointService.getBaseEndpoint() +
        calculateProductPriceEndpoint
      ));
  }
}
