import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { map } from 'rxjs/operators';

import {
  FSUserRole,
  FSUser,
  InsuranceQuoteList,
  AssetTableType,
} from '../../occ/occ-models/occ.models';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { QuoteService } from '../../core/my-account/facade';
import { PolicyService } from '../../core/my-account/facade';
import { ClaimService } from '../../core/my-account/facade';

@Component({
  selector: 'cx-fs-user-profile',
  templateUrl: 'user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected fsConsentService: ConsentService,
    protected routingService: RoutingService,
    protected userIdService: UserIdService,
    protected quoteService: QuoteService,
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    protected globalMessageService: GlobalMessageService,
    protected renderer: Renderer2
  ) {}

  @ViewChild('customerProfile') customerProfile: ElementRef;
  private subscription = new Subscription();
  customer$: Observable<FSUser>;
  seller: boolean;
  customerQuotes$: Observable<InsuranceQuoteList>;
  customerPolicies$: Observable<any>;
  customerClaims$: Observable<any>;
  assets: { [key: string]: any }[];
  assetSelected: AssetTableType;
  showAddressForm = false;
  userId: string;
  customerId: string;

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
          map(([routingData, userId, user]) => {
            this.userId = userId;
            this.customerId = routingData?.state?.params?.customerId;
            if (this.customerId) {
              this.getSellerAssets(user, userId, this.customerId);
            } else {
              this.getAssetsforCurrentUser();
            }
          })
        )
        .subscribe()
    );
  }

  protected getSellerAssets(user: User, userId: string, customerId: any) {
    this.seller = true;
    if (user?.roles?.includes(FSUserRole.SELLER)) {
      this.fsConsentService.loadCustomer(userId, customerId);
      this.fsConsentService.loadCustomerQuotes(userId, customerId);
      this.fsConsentService.loadCustomerPolicies(userId, customerId);
      this.fsConsentService.loadCustomerClaims(userId, customerId);
      this.customer$ = this.fsConsentService.getCustomer();
      this.customerQuotes$ = this.fsConsentService.getCustomerQuotes();
      this.customerPolicies$ = this.fsConsentService.getCustomerPolicies();
      this.customerClaims$ = this.fsConsentService.getCustomerClaims();
    }
  }

  protected getAssetsforCurrentUser() {
    this.seller = false;
    this.quoteService.loadQuotes();
    this.policyService.loadPolicies();
    this.claimService.loadClaims();
    this.customer$ = this.userAccountFacade.get();
    this.customerQuotes$ = this.quoteService.getQuotes();
    this.customerPolicies$ = this.policyService.getPolicies();
    this.customerClaims$ = this.claimService.getClaims();
  }

  showAssetList(assetsChosen: { [key: string]: any }[], activeClass) {
    this.assetSelected = activeClass;
    this.assets = assetsChosen;
  }

  showUserAddressForm() {
    this.showAddressForm = true;
    this.renderer.removeClass(this.customerProfile.nativeElement, 'slide-out');
  }

  changedAddress(action: string) {
    this.showAddressForm = false;
    this.renderer.addClass(this.customerProfile.nativeElement, 'slide-out');
    if (action) {
      this.fsConsentService.loadCustomer(this.userId, this.customerId);
      this.globalMessageService.add(
        {
          key: `addressForm.successfully${action}Address`,
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
