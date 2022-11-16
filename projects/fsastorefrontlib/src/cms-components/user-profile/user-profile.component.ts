import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CmsService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { UserProfileService } from '@spartacus/user/profile/core';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  Subscription,
} from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  reduce,
  shareReplay,
  switchMap,
  take,
  toArray,
} from 'rxjs/operators';
import {
  ClaimService,
  PolicyService,
  QuoteService,
} from '../../core/my-account/facade';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { CMSUserProfileComponent } from '../../occ/occ-models/cms-component.models';
import {
  AssetTableType,
  CmsComponent,
  FSUser,
  FSUserRole,
  InsuranceQuoteList,
  ProductOverviewCategory,
} from '../../occ/occ-models/occ.models';

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
    protected userProfileService: UserProfileService,
    protected userIdService: UserIdService,
    protected quoteService: QuoteService,
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    protected globalMessageService: GlobalMessageService,
    protected renderer: Renderer2,
    private componentData: CmsComponentData<CMSUserProfileComponent>,
    protected cmsService: CmsService
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
  showProductOverview = false;
  userId: string;
  customerId: string;

  selectedProducts = new BehaviorSubject(ProductOverviewCategory.ALL);
  selectedProducts$ = this.selectedProducts.asObservable();

  allProducts$: Observable<CmsComponent[]>;
  productsCountByCategory$: Observable<{
    [key: string]: typeof ProductOverviewCategory;
  }>;
  filteredProducts$: Observable<CmsComponent[]>;

  ngOnInit(): void {
    this.setAllProducts();
    this.setAllProductsCountByCategory();
    this.setFilteredProducts();
    this.loadCustomerDetails();
  }

  productsSelected(type: ProductOverviewCategory) {
    this.selectedProducts.next(type);
  }

  loadCustomerDetails() {
    this.subscription.add(
      combineLatest([
        this.routingService.getRouterState(),
        this.userProfileService.get(),
        this.userIdService.getUserId(),
        this.userAccountFacade.get(),
      ])
        .pipe(
          map(([routingData, customer, userId, user]) => {
            this.userId = userId;
            this.customerId = routingData?.state?.params?.customerId;
            if (
              customer.roles.includes(FSUserRole.SELLER) &&
              this.customerId !== customer.uid
            ) {
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

  showAssetList({
    assetsChosen,
    activeClass,
  }: {
    assetsChosen: { [key: string]: any }[];
    activeClass: AssetTableType;
  }) {
    this.assetSelected = activeClass;
    this.assets = assetsChosen;
  }

  toggleProductsOverview() {
    this.showProductOverview = !this.showProductOverview;
    this.selectedProducts.next(ProductOverviewCategory.ALL);
    this.assetSelected = null;
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

  private setAllProducts() {
    this.allProducts$ = this.componentData.data$.pipe(
      map(data => data.children.split(' ')),
      switchMap(children =>
        from(children).pipe(
          mergeMap(child => this.cmsService.getComponentData(child)),
          take(children.length),
          toArray()
        )
      )
    );
  }

  private setAllProductsCountByCategory() {
    const initialProductsCountObj = Object.values(
      ProductOverviewCategory
    ).reduce((prev, curr, i) => {
      if (!prev[curr]) prev[curr] = 0;
      return prev;
    }, {});

    this.productsCountByCategory$ = this.allProducts$.pipe(
      mergeMap(components =>
        from(components).pipe(
          reduce((prev, curr) => {
            prev[curr.category]++;
            prev['all']++;
            return prev;
          }, initialProductsCountObj),
          take(components.length)
        )
      ),
      shareReplay()
    );
  }

  private setFilteredProducts() {
    this.filteredProducts$ = combineLatest([
      this.selectedProducts$,
      this.allProducts$,
    ]).pipe(
      map(([selectedProduct, products]) => {
        if (selectedProduct === 'all') return products;
        return products.filter(product => product.category === selectedProduct);
      }),
      filter(products => !!products.length)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
