import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { QuoteAdapter } from './quote.adapter';

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

  public getQuotes(userId: string): Observable<any> {
    const url = this.getQuotesEndpoint(userId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
