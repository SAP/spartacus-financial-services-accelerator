import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSProductService } from './../../../../core/product-pricing/facade/product.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PricingData } from 'fsastorefrontlib/core/models/pricing.interface';

@Component({
  selector: 'cx-fs-configure-product-navigation',
  templateUrl: './configure-product-navigation.component.html',
  styleUrls: ['./configure-product-navigation.component.css'],
})
export class ConfigureProductNavigationComponent implements OnInit {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected pricingService: PricingService,
    protected productService: FSProductService,
    protected cartService: FSCartService,
  ) { }

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

              this.cartService.createCartForProduct(
                'LO_PERSONAL_LOAN',
                'LOAN_PRODUCT',
                1,
                this.pricingData
              );
            }
          })).subscribe()
    );
    this.routingService.go({
      cxRoute: 'addOptions'
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
