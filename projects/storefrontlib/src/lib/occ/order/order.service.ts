import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

// To be changed to a more optimised params after ticket: C3PO-1076
const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccOrderService {
  constructor(protected http: HttpClient, protected config: OccConfig) {}

  protected getOrderEndpoint(userId: string) {
    const orderEndpoint = '/users/' + userId + '/orders';
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      orderEndpoint
    );
  }

  public placeOrder(userId: string, cartId: string): Observable<any> {
    const url = this.getOrderEndpoint(userId);
    const params = new HttpParams({
      fromString: 'cartId=' + cartId + '&' + FULL_PARAMS
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, {}, { headers, params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getOrders(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<any> {
    const url = this.getOrderEndpoint(userId);
    let params = new HttpParams();
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('currentPage', currentPage.toString());
    }
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getOrder(userId: string, orderCode: string) {
    const url = this.getOrderEndpoint(userId);

    const orderUrl = url + '/' + orderCode;

    const params = new HttpParams({
      fromString: FULL_PARAMS
    });

    return this.http
      .get(orderUrl, {
        params: params
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
