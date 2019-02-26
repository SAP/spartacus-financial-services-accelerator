import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModification, OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccFSCartService {

    constructor(
        protected http: HttpClient,
        protected config: OccConfig
    ) { }

    public addToCart(userId: string, cartId: string, productCode: string, quantity: number): Observable<CartModification> {
        const toAdd = JSON.stringify({});
        const url = this.getAddOptionalProductToCartEndpoint(userId, cartId);
        const params = new HttpParams({
            fromString: 'productCode=' + productCode + '&quantity=' + quantity + FULL_PARAMS
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http
            .post<any>(url, toAdd, { headers, params })
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    public startBundle(userId: string, cartId: string, productCode: string, bundleTemplateId: string, quantity: number): Observable<CartModification> {
        const toAdd = JSON.stringify({});
        const url = this.getStartBundleForProductOfSpecifiedCart(userId, cartId);
        console.log(url);
        const params = new HttpParams({
            fromString: 'bundleTemplateId=' + bundleTemplateId + '&productCode=' + productCode + '&quantity=' + quantity + FULL_PARAMS
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http
            .post<any>(url, toAdd, { headers, params })
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    protected getAddOptionalProductToCartEndpoint(userId: string, cartId: string) {
        const addOptionalProductToCartEndpoint = '/users/' + userId + '/carts/' + cartId + '/fs-add-to-cart';
        return (
            (this.config.server.baseUrl || '') +
            this.config.server.occPrefix +
            this.config.site.baseSite +
            addOptionalProductToCartEndpoint
        );
    }

    protected getStartBundleForProductOfSpecifiedCart(userId: string, cartId: string) {
        const startBundleForProductOfCartEndpoint = '/users/' + userId + '/carts/' + cartId + '/fs-start-bundle';
        return (
            (this.config.server.baseUrl || '') +
            this.config.server.occPrefix +
            this.config.site.baseSite +
            startBundleForProductOfCartEndpoint
        );
    }

}
