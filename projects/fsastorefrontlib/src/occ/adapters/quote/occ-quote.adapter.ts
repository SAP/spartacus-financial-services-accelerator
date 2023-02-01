import { QUOTE_NORMALIZER } from '../../../core/my-account/connectors/converters';
import { InsuranceQuoteList } from './../../occ-models/occ.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { QuoteAdapter } from '../../../core/my-account/connectors/quote.adapter';
import { Models } from '../../../model/quote.model';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getQuotes(userId: string): Observable<Models.InsuranceQuote[]> {
    const url = this.occEndpointService.buildUrl('quotes', {
      urlParams: {
        userId,
      },
    });
    return this.http.get<InsuranceQuoteList>(url).pipe(
      pluck('insuranceQuotes'),
      this.converterService.pipeableMany(QUOTE_NORMALIZER),
      catchError((error: any) => throwError(error.json()))
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
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  invokeQuoteAction(
    userId: string,
    cartId: string,
    quoteAction: string,
    quoteBody: any
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
      body: quoteBody ? this.convertQuoteBody(quoteBody) : quoteBody,
    };
    return this.http
      .post(url, bindQuoteAction, { headers })
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  convertQuoteBody(body: any): any {
    let priceAttributes: any[] = body?.priceAttributeGroups[0].priceAttributes;
    priceAttributes = priceAttributes.filter(
      item => !(item.value instanceof Array)
    );

    const convertedQuoteBody = JSON.parse(JSON.stringify(body));
    convertedQuoteBody.priceAttributeGroups[0].priceAttributes =
      priceAttributes;

    return convertedQuoteBody;
  }

  getQuote(userId: string, quoteId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('quote', {
      urlParams: {
        userId,
        quoteId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
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
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
