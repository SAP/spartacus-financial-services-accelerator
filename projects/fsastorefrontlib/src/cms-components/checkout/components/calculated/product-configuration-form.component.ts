import { Component, OnInit } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';


@Component({
  selector: 'cx-fs-product-configuration-form',
  templateUrl: './product-configuration-form.component.html',
})
export class ProductConfigurationFormComponent implements OnInit {
  constructor(
    protected currentProductService: CurrentProductService
  ) {}

  product$: any;

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }


}
