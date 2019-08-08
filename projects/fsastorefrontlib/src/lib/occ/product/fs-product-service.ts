import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccFSProductService {

    constructor(
        protected http: HttpClient,
        protected config: OccConfig
    ) { }

    public getProductWithPricing(productCode: string, productPriceDescriptorList: any): Observable<any> {
        const url = this.getProductPricing(productCode);
        const params = new HttpParams({
            fromString: FULL_PARAMS
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http
            .post<any>( url, productPriceDescriptorList, { headers, params })
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    protected getProductPricing(productCode: string) {
        const productPricingService = '/product-pricing/' + productCode;
        return (
            (this.config.backend.occ.baseUrl || '') +
            this.config.backend.occ.prefix +
            'insurance' +
            productPricingService
        );
    }

}
