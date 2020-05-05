import { PricingData } from './../../../../occ/occ-models/form-pricing.interface';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentProductService } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-configure-product-navigation',
  templateUrl: './configure-product-navigation.component.html',
})
export class ConfigureProductNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected pricingService: PricingService,
    protected cartService: FSCartService,
    protected currentProductService: CurrentProductService
  ) {}

  subscription = new Subscription();

  categoryCode: string;
  pricingData: PricingData;

  productCode;
  bundleTemplate;
  product$;

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            this.categoryCode = params['formCode'];
          })
        )
        .subscribe()
    );

    this.product$ = this.currentProductService.getProduct().pipe(
      map(product => {
        if (product && product.code) {
          this.productCode = product.code;
          const fsProduct = <any>product;
          if (fsProduct.bundleTemplates[0]) {
            this.bundleTemplate = fsProduct.bundleTemplates[0].id;
          }
        }
        return product;
      })
    );
  }

  navigateNext() {
    const formDataId = this.formService.getFormDataIdByCategory(
      this.categoryCode
    );
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formService.submit(formData);
    this.subscription.add(
      this.formService
        .getSubmittedForm()
        .pipe(
          map(data => {
            if (data && data.content) {
              this.pricingData = this.pricingService.buildPricingData(
                JSON.parse(data.content)
              );
              this.cartService.createCartForProduct(
                this.productCode,
                this.bundleTemplate,
                1,
                this.pricingData
              );

              this.routingService.go({
                cxRoute: 'addOptions',
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
