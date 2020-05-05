import { FSProduct } from './../../../../../../../dist/fsastorefrontlib/occ/occ-models/occ.models.d';
import { FSProductService } from './../../../../core/product-pricing/facade/product.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { Subscription, of, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormDataService } from '../../../../../../dynamicforms/src/core/services';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrentProductService } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-calculated',
  templateUrl: './calculated.component.html',
})
export class CalculatedComponent implements OnInit, OnDestroy {
  constructor(
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected productService: FSProductService,
    protected activatedRoute: ActivatedRoute,
    protected currentProductService: CurrentProductService
  ) {}

  calculatedProductData = new BehaviorSubject<FSProduct>({});
  calculatedProductData$ = this.calculatedProductData.asObservable();

  pricingData = new BehaviorSubject<any>({});
  pricingData$ = this.pricingData.asObservable();

  public subscription = new Subscription();
  categoryCode;

  product$: any;
  productId;

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct().pipe(
      map(product => {
        if (product) {
          this.productId = product.code;
        }
        return product;
      })
    );

    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          switchMap(data => {
            if (data && data.content) {
              const pricingData = this.pricingService.buildPricingData(
                JSON.parse(data.content)
              );

              this.pricingData.next(pricingData);

              return this.productService
                .getCalculatedProductData(this.productId, pricingData)
                .pipe(
                  map(calculatedData =>
                    this.calculatedProductData.next(calculatedData)
                  )
                );
            }
            return of(null);
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
