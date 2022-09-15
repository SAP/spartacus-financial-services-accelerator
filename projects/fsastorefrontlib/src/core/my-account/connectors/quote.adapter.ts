import { Observable } from 'rxjs/internal/Observable';

export abstract class QuoteAdapter {
  /**
   * Abstract method used to get quotes for user
   *
   * @param userId The user id
   */
  abstract getQuotes(userId: string): Observable<any>;

  /**
   * Abstract method used to update quote for specified user and cart
   *
   * @param userId the user id
   * @param cartId the cart id
   * @param quoteContent the quote content
   */
  abstract updateQuote(
    userId: string,
    cartId: string,
    quoteContent: any
  ): Observable<any>;

  /**
   * Abstract method used to invoke specified quote action for user and cart
   *
   * @param userId the user id
   * @param cartId the cart id
   * @param quoteAction the quote action
   */
  abstract invokeQuoteAction(
    userId: string,
    cartId: string,
    quoteAction: string,
    body: any
  ): Observable<any>;

  /**
   * Abstract method used to get quote for user
   *
   * @param userId The user id
   * @param quoteId The quote id

   */
  abstract getQuote(userId: string, quoteId: string): Observable<any>;

  abstract compareQuotes(cartCodes: string[], userId: string): Observable<any>;
}
