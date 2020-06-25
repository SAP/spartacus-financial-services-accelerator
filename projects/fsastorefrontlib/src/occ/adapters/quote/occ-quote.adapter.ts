import { QUOTE_NORMALIZER } from '../../../core/my-account/connectors/converters';
import { InsuranceQuoteList } from './../../occ-models/occ.models';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService, ConverterService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, pluck } from 'rxjs/operators';
import { QuoteAdapter } from '../../../core/my-account/connectors/quote.adapter';
import { Models } from '../../../model/quote.model';
import { product } from '@spartacus/assets/translations/en/product';

@Injectable()
export class OccQuoteAdapter implements QuoteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getQuotes(userId: string): Observable<Models.InsuranceQuote[]> {
    const url = this.occEndpointService.getUrl('quotes', { userId });
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
    const url = this.occEndpointService.getUrl('updateQuote', {
      userId,
      cartId,
    });
    return this.http
      .patch(url, quoteContent)
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  invokeQuoteAction(
    userId: string,
    cartId: string,
    quoteAction: string
  ): Observable<any> {
    const url = this.occEndpointService.getUrl('quoteAction', {
      userId,
      cartId,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const bindQuoteAction = {
      actionName: quoteAction,
    };

    return this.http
      .post(url, bindQuoteAction, { headers })
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  updateInsuredObjects(
    userId: string,
    cartId: string,
    productPriceAttributes: any
  ): Observable<any> {
    const url = this.occEndpointService.getUrl('quoteUpdate', {
      userId,
      cartId,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(url, productPriceAttributes, { headers })
      .pipe(catchError((error: any) => throwError(error.json)));
  }
}
