import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  RoutingConfigService,
  RoutingService,
  CartService,
} from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutProgressComponent,
} from '@spartacus/storefront';
import { FSCategoryService } from '../../services/fs-category.service';
import { FSCheckoutStep } from './fs-checkout-step.component';
import { FSProduct } from '../../../../occ-models';

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
    protected categoryService: FSCategoryService,
    protected cartService: CartService
  ) {
    super(config, routingService, routingConfigService);
  }
  private subscription = new Subscription();
  activeCategory$: Observable<string>;
  checkotSteps: FSCheckoutStep[] = this.steps;

  ngOnInit() {
    super.ngOnInit();
    this.setActiveCategory();
    this.filterSteps();
  }

  setActiveStepIndex() {
    this.activeStepUrl = this.activatedRoute.routeConfig.path;
    this.checkotSteps.forEach((step, index) => {
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
    });
  }

  filterSteps() {
    this.subscription.add(
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
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
