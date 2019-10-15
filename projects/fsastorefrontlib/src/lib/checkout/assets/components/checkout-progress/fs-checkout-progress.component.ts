import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  RoutingConfigService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutProgressComponent,
} from '@spartacus/storefront';
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
    protected categoryService: FSCategoryService,
    protected winRef: WindowRef
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
      const category = 'category';

      if (params[categoryCode]) {
        this.categoryService.setActiveCategory(params[categoryCode]);
        this.winRef.localStorage.setItem(category, params[categoryCode]);
      } else if (params[formCode]) {
        this.categoryService.setActiveCategory(params[formCode]);
        this.winRef.localStorage.setItem(category, params[formCode]);
      } else {
        this.categoryService.setActiveCategory(
          this.winRef.localStorage.getItem(category)
        );
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
