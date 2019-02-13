import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { OccConfig, CartModification } from '@spartacus/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

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

    protected getAddOptionalProductToCartEndpoint(userId: string, cartId: string) {
        const adddOptionalProductToCartEndpoint = '/users/' + userId + '/carts/' + cartId + '/fs-add-to-cart';
        return (
            (this.config.server.baseUrl || '') +
            this.config.server.occPrefix +
            this.config.site.baseSite +
            adddOptionalProductToCartEndpoint
        );
    }

}
