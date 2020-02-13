import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { QuoteAdapter } from '../../../core/my-account/connectors/quote.adapter';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getQuotesEndpoint(userId: string) {
    const quotesEndpoint = '/users/' + userId + '/insurance-quotes';
    return this.occEndpointService.getBaseEndpoint() + quotesEndpoint;
  }

  protected getQuotesFromCartEndpoint(userId: string, cartId: string) {
    const quotesFromCartEndpoint =
      '/users/' + userId + '/carts/' + cartId + '/insurance-quotes';
    return this.occEndpointService.getBaseEndpoint() + quotesFromCartEndpoint;
  }

  protected bindQuoteEndpoint(userId: string, cartId: string) {
    const quotesFromCartEndpoint =
      '/users/' + userId + '/carts/' + cartId + '/insurance-quotes/action';
    return this.occEndpointService.getBaseEndpoint() + quotesFromCartEndpoint;
  }

  getQuotes(userId: string): Observable<any> {
    const url = this.getQuotesEndpoint(userId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateQuote(
    userId: string,
    cartId: string,
    quoteContent: any
  ): Observable<any> {
    const url = this.getQuotesFromCartEndpoint(userId, cartId);
    const params = new HttpParams();

    return this.http
      .patch(url, quoteContent, { params: params })
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  bindQuote(userId: string, cartId: string): Observable<any> {
    const url = this.bindQuoteEndpoint(userId, cartId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const bindQuoteAction = {
      actionName: 'BIND',
    };

    return this.http
      .post(url, bindQuoteAction, { headers })
      .pipe(catchError((error: any) => throwError(error.json)));
  }
}
