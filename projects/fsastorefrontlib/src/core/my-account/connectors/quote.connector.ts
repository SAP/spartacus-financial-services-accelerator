import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuoteAdapter } from './quote.adapter';

@Injectable({
  providedIn: 'root',
})
export class QuoteConnector {
  constructor(protected adapter: QuoteAdapter) {}

  getQuotes(userId: string): Observable<any> {
    return this.adapter.getQuotes(userId);
  }

  updateQuote(
    userId: string,
    cartId: string,
    quoteContent: any
  ): Observable<any> {
    return this.adapter.updateQuote(userId, cartId, quoteContent);
  }

  invokeQuoteAction(
    userId: string,
    cartId: string,
    action: string
  ): Observable<any> {
    return this.adapter.invokeQuoteAction(userId, cartId, action);
  }

  updateInsuredObjects(
    userId: string,
    cartId: string,
    productPriceAttributes: any
  ): Observable<any> {
    return this.adapter.updateInsuredObjects(
      userId,
      cartId,
      productPriceAttributes
    );
  }
}
