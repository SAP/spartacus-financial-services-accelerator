import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, RoutingService, UserIdService } from '@spartacus/core';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-quote-details',
  templateUrl: './quote-details.component.html',
})
export class QuoteDetailsComponent implements OnInit, OnDestroy {
  quote$: Observable<any>;
  cart$: Observable<Cart>;
  subscription = new Subscription();
  userId: string;

  constructor(
    protected routingService: RoutingService,
    protected userIdService: UserIdService,
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected cartService: FSCartService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          map(([routingData, id]) => {
            const quoteId = routingData.state.params.quoteId;
            if (quoteId) {
              this.quoteService.loadQuoteDetails(quoteId);
            }
            this.userId = id;
          })
        )
        .subscribe()
    );
    this.quote$ = this.quoteService.getQuoteDetails();
    if (this.quote$) {
      this.subscription.add(
        this.quote$
          .pipe(
            filter(quote => !!quote.quoteId),
            map(quoteData => {
              this.cartService.loadCart(quoteData.cartCode, this.userId);
              this.cart$ = this.cartService.getCart(quoteData.cartCode);
            })
          )
          .subscribe()
      );
    }
  }

  retrieveQuote(quote: any) {
    this.quoteService.retrieveQuoteCheckout(quote);
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['quote.details', translationGroup],
      translationKey
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
