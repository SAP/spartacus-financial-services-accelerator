import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { FSCart, InsuranceQuote } from '../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-quote-applications-details',
  templateUrl: './quotes-applications-details.component.html',
})
export class QuotesApplicationsDetailsComponent implements OnInit, OnDestroy {
  cart$: Observable<FSCart>;
  subscription = new Subscription();
  userId: string;
  quoteCodeForCompare: string;
  fsQuote$: Observable<InsuranceQuote>;

  constructor(
    protected routingService: RoutingService,
    protected userIdService: UserIdService,
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected cartService: FSCartService
  ) {}

  ngOnInit(): void {
    this.loadQuoteDetails();
    this.getCart();
  }

  loadQuoteDetails() {
    this.quoteCodeForCompare = sessionStorage.getItem('qouteCodeForCompare');
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId]) => {
            const quoteId = routingData.state.params.quoteId;
            if (quoteId) {
              this.fsQuote$ = this.quoteService
                .getQuoteApplictionDetails(userId, quoteId)
                .pipe(shareReplay());
            }
            this.userId = userId;
          })
        )
        .subscribe()
    );
  }

  getCart() {
    if (this.fsQuote$) {
      this.subscription.add(
        this.fsQuote$
          .pipe(
            filter(quote => !!quote?.quoteId),
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
    this.subscription.add(
      this.quoteService.retrieveQuoteCheckout(quote).subscribe()
    );
  }

  compareQuote(quote: InsuranceQuote) {
    this.quoteService.setQuoteForCompare(quote);
    this.routingService.go({ cxRoute: 'quotes' });
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['quote.details', translationGroup],
      translationKey
    );
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('qouteCodeForCompare');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
