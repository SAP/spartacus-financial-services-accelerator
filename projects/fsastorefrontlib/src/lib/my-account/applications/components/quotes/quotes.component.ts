import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QuotesService } from '../../services/quotes.service';
import { OccConfig } from '@spartacus/core';
import { AuthService } from '@spartacus/storefront';

// NOTE: this a work in progress component. The code here is not ready for production.

@Component({
  selector: 'fsa-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private service: QuotesService,
    private config: OccConfig,
    private auth: AuthService
  ) {}

  quotes$: Observable<any>;
  noQuotesText = 'You have no Quotes!';

  private user_id: string;

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.quotes$ = this.service.getQuotes(this.user_id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
