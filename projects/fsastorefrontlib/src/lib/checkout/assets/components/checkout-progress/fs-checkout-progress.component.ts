import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService, RoutingConfigService, RoutingService } from "@spartacus/core";
import { CheckoutConfig, CheckoutProgressComponent } from "@spartacus/storefront";
import { FSProduct } from "projects/fsastorefrontlib/src/lib/occ-models";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fs-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent {

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
    this.activatedRoute.params.subscribe(params => {
      let categoryCode = 'categoryCode';
      if (params[categoryCode]) {
        this.currentCategorySource.next(params[categoryCode]);
      } else {
        this.cartService.getActive().subscribe(cart => {
          if (cart.deliveryOrderGroups && cart.deliveryOrderGroups.length > 0
            && cart.deliveryOrderGroups[0].entries
            && cart.deliveryOrderGroups[0].entries.length > 0) {
            let fsProduct: FSProduct = cart.deliveryOrderGroups[0].entries[0].product;
            if (fsProduct && fsProduct.defaultCategory) {
              this.currentCategorySource.next(fsProduct.defaultCategory.code);
            }
          }
        });
      }
    })

    super.ngOnInit();

  }

}