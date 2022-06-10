import { QUOTE_NORMALIZER } from '../../../core/my-account/connectors/converters';
import { InsuranceQuoteList } from './../../occ-models/occ.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { QuoteAdapter } from '../../../core/my-account/connectors/quote.adapter';
import { Models } from '../../../model/quote.model';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getQuotes(userId: string): Observable<Models.InsuranceQuote[] | []> {
    const url = this.occEndpointService.buildUrl('quotes', {
      urlParams: {
        userId,
      },
    });
    return this.http.get<InsuranceQuoteList>(url).pipe(
      pluck('insuranceQuotes'),
      this.converterService.pipeableMany(QUOTE_NORMALIZER),
      map(data => (data ? data : [])),
      catchError((error: any) => throwError(error))
    );
  }

  updateQuote(
    userId: string,
    cartId: string,
    quoteContent: any
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('updateQuote', {
      urlParams: {
        userId,
        cartId,
      },
    });
    return this.http
      .patch(url, quoteContent)
      .pipe(catchError((error: any) => throwError(error)));
  }

  invokeQuoteAction(
    userId: string,
    cartId: string,
    quoteAction: string,
    body?: any
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('quoteAction', {
      urlParams: {
        userId,
        cartId,
      },
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const bindQuoteAction = {
      actionName: quoteAction,
      body: body,
    };
    return this.http
      .post(url, bindQuoteAction, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getQuote(userId: string, quoteId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('quote', {
      urlParams: {
        userId,
        quoteId,
      },
    });
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  compareQuotes(cartCodes: string[], userId: string) {
    const url = this.occEndpointService.buildUrl('compareQuotes', {
      urlParams: {
        userId,
      },
    });
    const params: HttpParams = new HttpParams().set(
      'cartCodes',
      cartCodes.toString()
    );
    return this.http
      .get(url, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
