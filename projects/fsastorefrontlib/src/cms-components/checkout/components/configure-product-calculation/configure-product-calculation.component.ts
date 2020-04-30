import { FSProductService } from './../../../../core/product-pricing/facade/product.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { Subscription, of, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FSProduct } from '../../../../../src/occ/occ-models';
import { FormDataService } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-configure-product-calculation',
  templateUrl: './configure-product-calculation.component.html',
})
export class ConfigureProductCalculationComponent implements OnInit, OnDestroy {
  constructor(
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected productService: FSProductService,
    protected activatedRoute: ActivatedRoute
  ) {}

  calculatedProductData = new BehaviorSubject<FSProduct>({});
  calculatedProductData$ = this.calculatedProductData.asObservable();

  pricingData = new BehaviorSubject<any>({});
  pricingData$ = this.pricingData.asObservable();

  public subscription = new Subscription();
  categoryCode;

  ngOnInit() {
    this.subscription
      .add(
        this.activatedRoute.params
          .pipe(
            map(params => {
              this.categoryCode = params['formCode'];
            })
          )
          .subscribe()
      )
      .add(
        this.formDataService
          .getSubmittedForm()
          .pipe(
            switchMap(data => {
              if (data && data.content) {
                let productCode;

                if (this.categoryCode === 'banking_fixed_term_deposit') {
                  productCode = 'FTD_FIXED_TERM_DEPOSIT';
                }
                if (this.categoryCode === 'banking_loans') {
                  productCode = 'LO_PERSONAL_LOAN';
                }
                const pricingData = this.pricingService.buildPricingData(
                  JSON.parse(data.content)
                );

                this.pricingData.next(pricingData);

                return this.productService
                  .getCalculatedProductData(productCode, pricingData)
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
