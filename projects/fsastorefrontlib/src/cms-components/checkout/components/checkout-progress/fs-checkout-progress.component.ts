import { FSCartService } from './../../../../core/cart/facade/fs-cart.service';
import { FSProduct } from './../../../../occ/occ-models/occ.models';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutProgressComponent,
} from '@spartacus/storefront';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCheckoutStep } from './fs-checkout-step.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
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
    protected cartService: FSCartService
  ) {
    super(config, routingService, routingConfigService);
  }
  private subscription = new Subscription();
  activeCategory$: Observable<string>;
  activeCategorySteps = [];

  ngOnInit() {
    super.ngOnInit();
    this.setActiveCategory();
    this.filterSteps();
  }

  setActiveCategory() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            const categoryCode = 'categoryCode';
            const formCode = 'formCode';
            if (params[categoryCode]) {
              this.categoryService.setActiveCategory(params[categoryCode]);
            } else if (params[formCode]) {
              this.categoryService.setActiveCategory(params[formCode]);
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
    this.activeCategorySteps.forEach((step, index) => {
      const routeUrl = this.routingConfigService.getRouteConfig(step.routeName)
        .paths[0];
      if (routeUrl === this.activeStepUrl) {
        this.activeStepIndex = index;
      }
    });
  }

  filterSteps() {
    this.subscription.add(
      this.activeCategory$.subscribe(activeCategory => {
        this.activeCategorySteps = this.steps.filter(step => {
          return (
            !(<FSCheckoutStep>step).restrictedCategories ||
            (<FSCheckoutStep>step).restrictedCategories.indexOf(
              activeCategory
            ) === -1
          );
        });
        this.setActiveStepIndex();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
