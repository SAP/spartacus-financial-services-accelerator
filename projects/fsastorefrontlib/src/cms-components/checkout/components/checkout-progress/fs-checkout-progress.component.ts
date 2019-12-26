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
import { FSCartService } from '../../../../core/checkout/services';

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
    protected fsCartService: FSCartService
  ) {
    super(config, routingService, routingConfigService);
  }
  private subscription = new Subscription();
  activeCategory$: Observable<string>;

  ngOnInit() {
    super.ngOnInit();
    this.getActiveCategory();
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

  getActiveCategory() {
    this.activeCategory$ = this.categoryService.getActiveCategory();
  }

  setActiveCategory() {
    this.subscription.add(this.fsCartService.setActiveCategory().subscribe());
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
