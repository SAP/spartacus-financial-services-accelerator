import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { CartService, RoutingConfigService, RoutingService } from "@spartacus/core";
import { CheckoutConfig, CheckoutProgressComponent } from "@spartacus/storefront";
import { FSProduct } from "projects/fsastorefrontlib/src/lib/occ-models";
import { BehaviorSubject } from 'rxjs';
import { FSCheckoutStep } from "./fs-checkout-step.component";


@Component({
  selector: 'fs-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent {
  steps: Array<FSCheckoutStep>;
  currentUrl: string;
  currentCategorySource = new BehaviorSubject<string>('');

  currentCategory = this.currentCategorySource.asObservable();

  category = 'insurances';

  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected router: Router,
    protected cartService: CartService
  ) {
    super(config, routingService, routingConfigService);
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    if (this.currentUrl.indexOf(this.category) > -1) {
      this.currentCategorySource.next(this.currentUrl.substring(this.currentUrl.indexOf('_') + 1));
    } else {
      this.cartService.getActive().subscribe(cart => {
        let fsProduct: FSProduct = cart.deliveryOrderGroups[0].entries[0].product;
        let categoryCode = fsProduct.defaultCategory.code;
        this.currentCategorySource.next(categoryCode.substring(categoryCode.indexOf('_') + 1));
      });
    }

    super.ngOnInit();

    this.steps.forEach(step => {
      if (step.routeName.includes('category')) {
        step.categoryUrl = '/checkout/c/insurances_';
      }
    })
  }

}