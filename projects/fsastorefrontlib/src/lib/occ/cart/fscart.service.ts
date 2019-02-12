import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccFSCartService {
    constructor(
        protected http: HttpClient,
        protected config: OccConfig
    ) { }

    public addToCart(userId: string, cartId: string, productCode: string, quantity: number): Observable<any> {
        const url = this.getAddOptionalProductToCartEndpoint(userId, cartId);
        const params = new HttpParams({
            fromString: 'productCode=' + productCode + '&quantity=' + quantity + FULL_PARAMS
        });
        return this.http.post(url, params);
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
