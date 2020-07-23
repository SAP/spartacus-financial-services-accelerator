import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutProgressComponent,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  FSProduct,
  FSCheckoutStep,
} from './../../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';

@Component({
  selector: 'cx-fs-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent
  implements OnInit, OnDestroy {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected categoryService: CategoryService,
    protected cartService: FSCartService,
    protected productService: CurrentProductService,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {
    super(config, routingService, routingConfigService);
  }
  private subscription = new Subscription();
  activeCategory$: Observable<string>;

  ngOnInit() {
    super.ngOnInit();
    this.setActiveCategory();
    this.filterSteps();
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          tap(() => {
            this.checkoutConfigService.triggerPreviousNextStepSet(
              this.activatedRoute
            );
          })
        )
        .subscribe()
    );
  }

  setActiveCategory() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            const categoryCode = 'categoryCode';
            const productCode = 'productCode';
            const formCode = 'formCode';
            if (params[categoryCode]) {
              this.categoryService.setActiveCategory(params[categoryCode]);
            } else if (params[formCode]) {
              this.categoryService.setActiveCategory(params[formCode]);
            } else if (params[productCode]) {
              this.subscription.add(
                this.productService
                  .getProduct()
                  .pipe(
                    filter(Boolean),
                    map(currentProduct => {
                      const fsProduct = <FSProduct>currentProduct;
                      this.categoryService.setActiveCategory(
                        fsProduct.defaultCategory.code
                      );
                    })
                  )
                  .subscribe()
              );
            } else {
              this.subscription.add(
                this.cartService.getActive().subscribe(cart => {
                  if (
                    cart.deliveryOrderGroups &&
                    cart.deliveryOrderGroups.length > 0 &&
                    cart.deliveryOrderGroups[0].entries &&
                    cart.deliveryOrderGroups[0].entries.length > 0
                  ) {
                    const fsProduct: FSProduct =
                      cart.deliveryOrderGroups[0].entries[0].product;
                    if (fsProduct && fsProduct.defaultCategory) {
                      this.categoryService.setActiveCategory(
                        fsProduct.defaultCategory.code
                      );
                    }
                  }
                })
              );
            }
            this.activeCategory$ = this.categoryService.getActiveCategory();
          })
        )
        .subscribe()
    );
  }

  setActiveStepIndex() {
    this.activeStepUrl = this.activatedRoute.routeConfig.path;
    this.checkoutConfigService.steps.forEach((step, index) => {
      const routeUrl = this.routingConfigService.getRouteConfig(step.routeName)
        .paths[0];
      if (routeUrl === this.activeStepUrl) {
        this.activeStepIndex = index;
      }
    });
  }

  filterSteps() {
    this.subscription.add(
      this.activeCategory$
        .pipe(
          filter(activeCategory => activeCategory !== ''),
          map(activeCategory => {
            this.checkoutConfigService.steps = this.steps.filter(step => {
              return (
                !(<FSCheckoutStep>step).restrictedCategories ||
                (<FSCheckoutStep>step).restrictedCategories.indexOf(
                  activeCategory
                ) === -1
              );
            });
            this.setActiveStepIndex();
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
