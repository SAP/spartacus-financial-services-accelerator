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

  bindQuote(userId: string, cartId: string): Observable<any> {
    return this.adapter.bindQuote(userId, cartId);
  }
}
