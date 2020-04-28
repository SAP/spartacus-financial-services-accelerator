import { FSProductService } from './../../../../core/product-pricing/facade/product.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormDataService } from '../../../../../../dynamicforms/src/core/services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-calculated',
  templateUrl: './calculated.component.html',
  styleUrls: ['./calculated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatedComponent implements OnInit {
  constructor(
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected productService: FSProductService
  ) { }

  public subscription = new Subscription();
  product$;

  ngOnInit() {
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          map(data => {
            if (data && data.content) {
              let pricingData = this.pricingService.buildPricingData(
                JSON.parse(data.content)
              );
              this.product$ = this.productService.getCalculatedProductData(
                'LO_PERSONAL_LOAN',
                pricingData
              );
            }
          })
        )
        .subscribe()
    );
  }
}
