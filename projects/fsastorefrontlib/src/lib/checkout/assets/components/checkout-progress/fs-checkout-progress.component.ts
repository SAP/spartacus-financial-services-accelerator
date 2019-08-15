import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, RoutingConfigService, RoutingService } from '@spartacus/core';
import { CheckoutConfig, CheckoutProgressComponent } from '@spartacus/storefront';
import { FSProduct } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fsa-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent implements OnInit {

  currentCategorySource = new BehaviorSubject<string>('');
  currentCategory = this.currentCategorySource.asObservable();

  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected cartService: CartService
  ) {
    super(config, routingService, routingConfigService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setActiveStepIndex();
    this.setActiveCategory();
  }

  setActiveStepIndex() {
    this.steps = this.config.checkout.steps;
    this.activeStepUrl = this.activatedRoute.routeConfig.path;
    this.steps.forEach((step, index) => {
      const routeUrl = this.routingConfigService.getRouteConfig(step.routeName).paths[0];
      if (routeUrl === this.activeStepUrl) {
        this.activeStepIndex = index;
      }
    });
  }

  setActiveCategory() {
    this.activatedRoute.params.subscribe(params => {
      const categoryCode = 'categoryCode';
      const formCode = 'formCode';

      if (params[categoryCode]) {
        this.currentCategorySource.next(params[categoryCode]);
      }
      if (params[formCode]) {
        this.currentCategorySource.next(params[formCode]);
      } else {
        this.cartService.getActive().subscribe(cart => {
          if (cart.deliveryOrderGroups && cart.deliveryOrderGroups.length > 0
            && cart.deliveryOrderGroups[0].entries
            && cart.deliveryOrderGroups[0].entries.length > 0) {
            const fsProduct: FSProduct = cart.deliveryOrderGroups[0].entries[0].product;
            if (fsProduct && fsProduct.defaultCategory) {
              this.currentCategorySource.next(fsProduct.defaultCategory.code);
            }
          }
        });
      }
    });
  }
}
