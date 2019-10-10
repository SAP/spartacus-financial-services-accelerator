import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  CartService,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutProgressComponent,
} from '@spartacus/storefront';
import { FSProduct } from '../../../../occ-models/occ.models';
import { FSCategoryService } from '../../services/fs-category.service';
import { FSCheckoutStep } from './fs-checkout-step.component';

@Component({
  selector: 'fsa-checkout-progress',
  templateUrl: './fs-checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSCheckoutProgressComponent extends CheckoutProgressComponent
  implements OnInit {
  constructor(
    protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected cartService: CartService,
    protected categoryService: FSCategoryService
  ) {
    super(config, routingService, routingConfigService);
  }

  activeCategory$: Observable<string>;

  ngOnInit() {
    super.ngOnInit();
    this.setActiveCategory();
    this.filterSteps();
  }

  setActiveStepIndex() {
    this.activeStepUrl = this.activatedRoute.routeConfig.path;
    this.steps.forEach((step, index) => {
      const routeUrl = this.routingConfigService.getRouteConfig(step.routeName)
        .paths[0];
      if (routeUrl === this.activeStepUrl) {
        this.activeStepIndex = index;
      }
    });
  }

  setActiveCategory() {
    this.activeCategory$ = this.categoryService.getActiveCategory();

    this.activatedRoute.params.subscribe(params => {
      const categoryCode = 'categoryCode';
      const formCode = 'formCode';

      if (params[categoryCode]) {
        this.categoryService.setActiveCategory(params[categoryCode]);
      } else if (params[formCode]) {
        this.categoryService.setActiveCategory(params[formCode]);
      } else {
        this.cartService.getActive().pipe(take(1)).subscribe(cart => {
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
        });
      }
    });
  }

  filterSteps() {
    this.activeCategory$.subscribe(activeCategory => {
      this.steps = this.steps.filter(step => {
        return (
          !(<FSCheckoutStep>step).restrictedCategories ||
          (<FSCheckoutStep>step).restrictedCategories.indexOf(
            activeCategory
          ) === -1
        );
      });
      this.setActiveStepIndex();
    });
  }
}
