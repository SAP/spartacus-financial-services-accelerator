import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSProductService } from './../../../../core/product-pricing/facade/product.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PricingData } from 'fsastorefrontlib/core/models/pricing.interface';

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
    protected productService: FSProductService,
    protected cartService: FSCartService
  ) {}

  subscription = new Subscription();

  categoryCode: string;
  pricingData: PricingData;

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
              let productCode;
              let bundleId;

              if (this.categoryCode === 'banking_fixed_term_deposit') {
                productCode = 'FTD_FIXED_TERM_DEPOSIT';
                bundleId = 'FIXED_TERM_DEPOSIT_PRODUCT';
              }

              if (this.categoryCode === 'banking_loans') {
                productCode = 'LO_PERSONAL_LOAN';
                bundleId = 'LOAN_PRODUCT';
              }

              this.cartService.createCartForProduct(
                productCode,
                bundleId,
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
