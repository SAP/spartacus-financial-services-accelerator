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
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  BindingStateType,
  FSCart,
  FSCheckoutStep,
  FSProduct,
} from './../../../../occ/occ-models/occ.models';

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
    public checkoutConfigService: FSCheckoutConfigService
  ) {
    super(config, routingService, routingConfigService);
  }
  private subscription = new Subscription();
  activeCategory$: Observable<string>;
  activeProduct$: Observable<FSProduct>;

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
                      this.activeProduct$ = of(fsProduct);
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
                      this.activeProduct$ = of(fsProduct);
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
    const activeStepRoute = this.activatedRoute.snapshot.data.cxRoute;
    this.checkoutConfigService.steps.forEach((step, index) => {
      const stepRoute = step.routeName;
      if (stepRoute === activeStepRoute) {
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

  isQuoteBound(): Observable<boolean> {
    return this.cartService.getActive().pipe(
      filter(cart => !!cart),
      map(
        cart =>
          (<FSCart>cart).insuranceQuote?.state?.code === BindingStateType.BIND
      )
    );
  }

  isProductStep(step: FSCheckoutStep): boolean {
    return this.checkoutConfigService.isProductStep(step.routeName);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
