import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { ActivatedRoute } from '@angular/router';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { RoutingService, User, UserIdService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { InsuranceQuoteList } from 'fsastorefrontlib/occ';

@Component({
  selector: 'cx-fs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected route: ActivatedRoute,
    protected fsConsentService: ConsentService,
    protected routingService: RoutingService,
    protected userIdService: UserIdService
  ) {}

  private subscription = new Subscription();
  customer$: Observable<User> = this.fsConsentService.getCustomer();
  customerQuotes$: Observable<
    InsuranceQuoteList
  > = this.fsConsentService.getCustomerQuotes();
  customerPolicies$ = this.fsConsentService.getCustomerPolicies();
  customerClaims$ = this.fsConsentService.getCustomerClaims();

  ngOnInit(): void {
    this.loadCustomer();
    this.loadCustomerQuotes();
    this.loadCustomerPolicies();
    this.loadCustomerClaims();
  }

  loadCustomer() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId]) => {
            const customerId = routingData.state.params.customerId;
            if (customerId) {
              this.fsConsentService.loadCustomer(userId, customerId);
            }
          })
        )
        .subscribe()
    );
  }

  loadCustomerQuotes() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId]) => {
            const customerId = routingData.state.params.customerId;
            if (customerId) {
              this.fsConsentService.loadCustomerQuotes(userId, customerId);
            }
          })
        )
        .subscribe()
    );
  }

  loadCustomerPolicies() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId]) => {
            const customerId = routingData.state.params.customerId;
            if (customerId) {
              this.fsConsentService.loadCustomerPolicies(userId, customerId);
            }
          })
        )
        .subscribe()
    );
  }

  loadCustomerClaims() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId]) => {
            const customerId = routingData.state.params.customerId;
            if (customerId) {
              this.fsConsentService.loadCustomerClaims(userId, customerId);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
