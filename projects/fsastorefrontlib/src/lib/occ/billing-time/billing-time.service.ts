import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccBillingTimeService {

    constructor(
        protected http: HttpClient,
        protected config: OccConfig
    ) { }

    public getBillingTimes(productCodes: string[]): any {
        const url = this.getBillingTimesEndPoint(productCodes);
        const params = new HttpParams({
            fromString: 'productCodes=' + productCodes + FULL_PARAMS
        });
        console.log(url);
        console.log(params)
        return this.http
            .get(url, { params: params })
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    protected getBillingTimesEndPoint(productCodes: string[]) {
        const billingTimeEndpoint = '/billing-events';
        return (
            (this.config.server.baseUrl || '') +
            this.config.server.occPrefix +
            this.config.site.baseSite +
            billingTimeEndpoint
        );
    }

}
