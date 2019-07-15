import { Component } from '@angular/core';
import { OccFSProductService } from 'projects/fsastorefrontlib/src/lib/occ/product/fs-product-service';
import { RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { ɵd as CheckoutConfigService } from '@spartacus/storefront';
import { PricingService } from 'projects/fsastorefrontlib/src/lib/occ/pricing/pricing.service';


@Component({
  selector: 'fsa-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent {
  
  constructor(
    protected productService: OccFSProductService,
    protected routingService: RoutingService,
    private  activatedRoute: ActivatedRoute,
    private  checkoutConfigService: CheckoutConfigService,
    private  pricingService: PricingService 

  ) { }
  formDataArray: any = [];
  pricingAttributes = {};
  checkoutStepUrlNext: string;

  ngOnInit()
  {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
  }

   onClickSubmit(formData) {
    this.formDataArray = [];
    Object.entries(formData).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      let obj = {
        "key" : key,
        "value" : value
      }
      this.formDataArray.push(obj);
    });
    this.pricingAttributes = {
      "productPriceDescriptors": this.formDataArray
     };    
    this.pricingService.setPricingAttributes(this.pricingAttributes);
    //this.routingService.go(this.checkoutStepUrlNext);
    this.routingService.go('checkout/c/insurances_travel');

   }
}
