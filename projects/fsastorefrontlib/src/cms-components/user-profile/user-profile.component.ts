import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { RoutingService, User, UserIdService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';

import { QuoteService } from '../../core/my-account/facade';
import { PolicyService } from '../../core/my-account/facade';
import { ClaimService } from '../../core/my-account/facade';
import { FSUserRole, InsuranceQuoteList} from '../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-user-profile',
  templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected fsConsentService: ConsentService,
    protected routingService: RoutingService,
    protected userIdService: UserIdService,
    protected quoteService: QuoteService,
    protected policyService: PolicyService,
    protected claimService: ClaimService
  ) {}

  private subscription = new Subscription();
  customer: User;
  customer$: Observable<User>;
  customerQuotes$: Observable<InsuranceQuoteList>;
  customerPolicies$;
  customerClaims$;

  ngOnInit(): void {
    this.loadCustomerDetails();
  }

  loadCustomerDetails() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userIdService.getUserId(),
        this.userAccountFacade.get(),
      ])
        .pipe(
          filter(([routingData, _]) => !routingData.nextState),
          map(([routingData, userId, user]) => {
            const customerId = routingData.state.params.customerId;
            if (customerId) {
              if (user.roles.includes(FSUserRole.SELLER)) {
                this.fsConsentService.loadCustomer(userId, customerId);
                this.fsConsentService.loadCustomerAssets(userId, customerId, 'claims');
                this.fsConsentService.loadCustomerAssets(userId, customerId, 'insuranceQuotes');
                this.fsConsentService.loadCustomerAssets(userId, customerId, 'insurancePolicies');
                
                this.customer$ = this.fsConsentService.getCustomer();
                this.customerQuotes$ = this.fsConsentService.getCustomerQuotes();
                this.customerPolicies$ = this.fsConsentService.getCustomerPolicies();
                this.customerClaims$ = this.fsConsentService.getCustomerClaims();
              } else {
                this.quoteService.loadQuotes();
                this.policyService.loadPolicies();
                this.claimService.loadClaims();
                this.customer = user;
                this.customerQuotes$ = this.quoteService.getQuotes();
                this.customerPolicies$ = this.policyService.getPolicies();
                this.customerClaims$ = this.claimService.getClaims();
              }
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
